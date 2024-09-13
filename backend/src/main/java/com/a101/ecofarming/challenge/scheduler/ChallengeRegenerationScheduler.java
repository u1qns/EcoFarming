package com.a101.ecofarming.challenge.scheduler;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import java.time.LocalDate;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class ChallengeRegenerationScheduler {

    private final JobLauncher jobLauncher;
    private final Job challengeRegenerationJob;

    // 일요일 자정에 챌린지 재생성
    @Scheduled(cron = "0 0 0 * * SUN")
    public void regenerateChallenges() throws Exception {
        jobLauncher.run(challengeRegenerationJob, new JobParametersBuilder()
                .addLocalDate("today", LocalDate.now())
                .toJobParameters());
    }
}