package com.a101.ecofarming.challengeUser.batch.processor;

import com.a101.ecofarming.challengeUser.dao.ChallengeUserDao;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class ChallengeSettlementProcessor {

    @Bean
    @StepScope
    public ItemProcessor<ChallengeUserDao, ChallengeUserDao> failureUserProcessor(StepExecution stepExecution) {
        // StepExecution에서 JobExecutionContext를 가져옴
        ExecutionContext jobContext = stepExecution.getJobExecution().getExecutionContext();

        return ChallengeUserDao -> {
            // 성공률에 따른 반환금 계산 및 업데이트
            int returnAmount = ChallengeUserDao.getBetAmount() * ChallengeUserDao.getSuccessRate() / 100;
            ChallengeUserDao.updateReturnAmount(returnAmount);

            // JobExecutionContext에서 총 상금액을 가져와서 갱신
            long totalPrizeAmount = jobContext.getLong("totalPrizeAmount");
            totalPrizeAmount += ChallengeUserDao.getBetAmount() - returnAmount;
            jobContext.putLong("totalPrizeAmount", totalPrizeAmount);

            return ChallengeUserDao;
        };
    }

    @Bean
    @StepScope
    public ItemProcessor<ChallengeUserDao, ChallengeUserDao> successUserProcessor(StepExecution stepExecution) {
        ExecutionContext jobContext = stepExecution.getJobExecution().getExecutionContext();

        return ChallengeUserDao -> {
            // 성공률 100%인 사람들에게 보상을 나눠줌
            long totalPrizeAmount = jobContext.getLong("totalPrizeAmount");
            long totalBetAmount = jobContext.getLong("totalBetAmount");

            int returnAmount;
            if (totalPrizeAmount > 0 && totalBetAmount > 0) {
                returnAmount = (int) (ChallengeUserDao.getBetAmount() + (ChallengeUserDao.getBetAmount() * totalPrizeAmount / totalBetAmount));
            } else {
                returnAmount = ChallengeUserDao.getBetAmount(); // 기본값 설정
            }

            ChallengeUserDao.updateReturnAmount(returnAmount);

            return ChallengeUserDao;
        };
    }
}
