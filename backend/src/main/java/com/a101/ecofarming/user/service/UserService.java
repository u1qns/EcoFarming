package com.a101.ecofarming.user.service;

import com.a101.ecofarming.challengeUser.repository.ChallengeUserRepository;
import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.user.dto.response.MyPageResponseDto;
import com.a101.ecofarming.user.entity.User;
import com.a101.ecofarming.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        long upcomingChallengeCount = challengeUserRepository.countUpcomingChallengeByUserId(userId);
        long ongoingChallengeCount = challengeUserRepository.countOngoingChallengeByUserId(userId);
        long completedChallengeCount = challengeUserRepository.countCompletedChallengeByUserId(userId);

        return new MyPageResponseDto(
                user.getAmount(),
                user.getPrizeAmount(),
                upcomingChallengeCount,
                ongoingChallengeCount,
                completedChallengeCount
        );
    }
}
