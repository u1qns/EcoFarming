package com.a101.ecofarming.user.service;

import com.a101.ecofarming.challengeUser.entity.ChallengeUser;
import com.a101.ecofarming.challengeUser.repository.ChallengeUserRepository;
import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.user.dto.response.MyPageResponseDto;
import com.a101.ecofarming.user.entity.User;
import com.a101.ecofarming.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static com.a101.ecofarming.global.exception.ErrorCode.*;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final ChallengeUserRepository challengeUserRepository;

    @Transactional(readOnly = true)
    public MyPageResponseDto findUserMyPage(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        List<ChallengeUser> challengeUsers = challengeUserRepository.findByUserId(userId);

        // 상태별 카운트 초기화
        long upcomingChallengeCount = 0;
        long ongoingChallengeCount = 0;
        long completedChallengeCount = 0;

        // 루프를 통해 카운트를 계산
        LocalDate now = LocalDate.now();
        for (ChallengeUser cu : challengeUsers) {
            LocalDate startDate = cu.getChallenge().getStartDate();
            LocalDate endDate = cu.getChallenge().getEndDate();

            if (startDate.isAfter(now)) {
                upcomingChallengeCount++;
            } else if (endDate.isBefore(now)) {
                completedChallengeCount++;
            } else {
                ongoingChallengeCount++;
            }
        }

        return new MyPageResponseDto(
                user.getAmount(),
                user.getPrizeAmount(),
                upcomingChallengeCount,
                ongoingChallengeCount,
                completedChallengeCount
        );
    }
}
