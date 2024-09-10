package com.a101.ecofarming.challengeUser.batch.config;

import com.a101.ecofarming.challengeUser.dao.ChallengeUserDao;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.*;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
public class ChallengeSettlementBatchConfig {

    private final JobRepository jobRepository;

    private final PlatformTransactionManager transactionManager;

    private final JdbcTemplate jdbcTemplate;

    @Bean
    public Job challengeSettlementJob(Step failureSettlementStep, Step successSettlementStep) {
        return new JobBuilder("challengeSettlementJob", jobRepository)
                .start(failureSettlementStep)   // 실패한 사람에 대한 정산
                .next(successSettlementStep)    // 성공한 사람에 대한 정산
                .listener(new JobExecutionListener() {
                    @Override
                    public void beforeJob(JobExecution jobExecution) {
                        ExecutionContext jobExecutionContext = jobExecution.getExecutionContext();
                        jobExecutionContext.put("totalPrizeAmount", 0L); // 총 상금액 초기화

                        long challengeId = jobExecution.getJobParameters().getLong("challengeId");
                        String sql = "SELECT COALESCE(SUM(bet_amount), 0) FROM challenge_user WHERE success_rate = 100 AND challenge_id = ?";

                        long totalBetAmount = jdbcTemplate.queryForObject(sql, new Object[]{challengeId}, Long.class);
                        jobExecutionContext.putLong("totalBetAmount", totalBetAmount);
                    }
                })
                .build();
    }

    @Bean
    public Step failureSettlementStep(ItemReader<ChallengeUserDao> failureUserReader,
                                         ItemProcessor<ChallengeUserDao, ChallengeUserDao> failureUserProcessor,
                                         ItemWriter<ChallengeUserDao> failureUserWriter) {
        return new StepBuilder("failureSettlementStep", jobRepository)
                .<ChallengeUserDao, ChallengeUserDao>chunk(10, transactionManager)
                .reader(failureUserReader)
                .processor(failureUserProcessor)
                .writer(failureUserWriter)
                .build();
    }

    @Bean
    public Step successSettlementStep(ItemReader<ChallengeUserDao> successUserReader,
                                         ItemProcessor<ChallengeUserDao, ChallengeUserDao> successUserProcessor,
                                         ItemWriter<ChallengeUserDao> successUserWriter) {
        return new StepBuilder("settlementStepForSuccess", jobRepository)
                .<ChallengeUserDao, ChallengeUserDao>chunk(10, transactionManager)
                .reader(successUserReader)
                .processor(successUserProcessor)
                .writer(successUserWriter)
                .build();
    }
}
