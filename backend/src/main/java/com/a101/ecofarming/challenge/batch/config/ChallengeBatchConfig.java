package com.a101.ecofarming.challenge.batch.config;

import com.a101.ecofarming.challenge.batch.tasklet.ChallengeRegenerationTasklet;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
public class ChallengeBatchConfig {

    private final JobRepository jobRepository;

    private final PlatformTransactionManager transactionManager;

    private final ChallengeRegenerationTasklet challengeRegenerationTasklet;

    @Bean
    public Job challengeRegenerationJob() {
        return new JobBuilder("challengeRegenerationJob", jobRepository)
                .start(challengeRegenerationStep())
                .build();
    }

    @Bean
    public Step challengeRegenerationStep() {
        return new StepBuilder("challengeRegenerationStep", jobRepository)
                .tasklet(challengeRegenerationTasklet, transactionManager)
                .allowStartIfComplete(false) // 이미 성공한 jobInstance에 대해서 재실행 불가
                .build();
    }
}
