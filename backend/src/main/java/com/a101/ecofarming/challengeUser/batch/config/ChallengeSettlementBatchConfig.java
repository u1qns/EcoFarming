package com.a101.ecofarming.challengeUser.batch.config;

import com.a101.ecofarming.challengeUser.batch.writer.FailureSettlementWriter;
import com.a101.ecofarming.challengeUser.batch.writer.SuccessSettlementWriter;
import com.a101.ecofarming.challengeUser.dao.ChallengeUserDao;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.*;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.lang.NonNull;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
public class ChallengeSettlementBatchConfig {

    private final JobRepository jobRepository;

    private final PlatformTransactionManager transactionManager;

    private final FailureSettlementWriter failureSettlementWriter;

    private final SuccessSettlementWriter successSettlementWriter;

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Bean
    public Job challengeSettlementJob(Step failureSettlementStep, Step successSettlementStep) {
        return new JobBuilder("challengeSettlementJob", jobRepository)
                .start(failureSettlementStep)   // 실패한 사람에 대한 정산
                .next(successSettlementStep)    // 성공한 사람에 대한 정산
                .listener(new JobExecutionListener() {
                    @Override
                    public void beforeJob(@NonNull JobExecution jobExecution) {
                        ExecutionContext jobExecutionContext = jobExecution.getExecutionContext();
                        jobExecutionContext.put("totalPrizeAmount", 0L); // 총 상금액 초기화

                        long totalBetAmount = getTotalBetAmount(jobExecution.getJobParameters().getLong("challengeId"));
                        jobExecutionContext.putLong("totalBetAmount", totalBetAmount);
                    }
                })
                .build();
    }

    @Bean
    public Step failureSettlementStep(ItemReader<ChallengeUserDao> failureUserReader,
                                         ItemProcessor<ChallengeUserDao, ChallengeUserDao> failureUserProcessor) {
        return new StepBuilder("failureSettlementStep", jobRepository)
                .<ChallengeUserDao, ChallengeUserDao>chunk(10, transactionManager)
                .reader(failureUserReader)
                .processor(failureUserProcessor)
                .writer(failureSettlementWriter)
                .build();
    }

    @Bean
    public Step successSettlementStep(ItemReader<ChallengeUserDao> successUserReader,
                                         ItemProcessor<ChallengeUserDao, ChallengeUserDao> successUserProcessor) {
        return new StepBuilder("settlementStepForSuccess", jobRepository)
                .<ChallengeUserDao, ChallengeUserDao>chunk(10, transactionManager)
                .reader(successUserReader)
                .processor(successUserProcessor)
                .writer(successSettlementWriter)
                .build();
    }

    public Long getTotalBetAmount(Long challengeId) {
        String sql = "SELECT COALESCE(SUM(bet_amount), 0) FROM challenge_user WHERE success_rate = 100 AND challenge_id = :challengeId";

        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("challengeId", challengeId);

        return namedParameterJdbcTemplate.queryForObject(sql, parameters, Long.class);
    }
}
