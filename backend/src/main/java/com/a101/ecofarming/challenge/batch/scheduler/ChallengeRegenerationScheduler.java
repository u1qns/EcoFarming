package com.a101.ecofarming.challenge.batch.scheduler;

import com.a101.ecofarming.challenge.entity.Challenge;
import com.a101.ecofarming.challenge.repository.ChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import java.time.LocalDate;
import java.util.List;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class ChallengeRegenerationScheduler {

    private final JobLauncher jobLauncher;

    private final Job challengeRegenerationJob;

    private final ChallengeRepository challengeRepository;

    // 매일 자정 기준, 오늘 끝나는 챌린지가 있으면 챌린지 재생성
    @Scheduled(cron = "0 0 0 * * *")
    public void regenerateChallenges() throws Exception {
        LocalDate today = LocalDate.now();
        List<Challenge> endingChallenges = challengeRepository.findChallengesEndingByDate(today);

        if(endingChallenges.isEmpty()){
            return;
        }

        jobLauncher.run(challengeRegenerationJob, new JobParametersBuilder()
                .addLocalDate("today", today)
                .toJobParameters());
    }
}
