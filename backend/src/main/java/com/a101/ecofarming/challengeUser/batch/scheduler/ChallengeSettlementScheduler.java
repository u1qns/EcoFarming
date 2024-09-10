package com.a101.ecofarming.challengeUser.batch.scheduler;

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
public class ChallengeSettlementScheduler {

    private final JobLauncher jobLauncher;

    private final Job challengeSettlementJob;

    private final ChallengeRepository challengeRepository;

    // 일요일 자정에 챌린지 재생성
    @Scheduled(cron = "0 0 0 * * MON")
    public void settlementChallenges() throws Exception {
        LocalDate today = LocalDate.now();
        List<Challenge> endingChallenges = challengeRepository.findChallengesEndingByDate(today.minusDays(1));

        if(endingChallenges.isEmpty()){
            return;
        }

        for(Challenge challenge : endingChallenges){
            jobLauncher.run(challengeSettlementJob, new JobParametersBuilder()
                    .addLocalDate("today", today)
                    .addLong("challengeId", challenge.getId().longValue())
                    .toJobParameters());
        }
    }
}
