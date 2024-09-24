package com.a101.ecofarming.user.service;

import com.a101.ecofarming.challengeUser.dto.response.ChallengeCountsDto;
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

        ChallengeCountsDto challengeCountsDto = challengeUserRepository.countChallengesByUserId(userId);

        return MyPageResponseDto.builder()
                .username(user.getName())
                .amount(user.getAmount())
                .prizeAmount(user.getPrizeAmount())
                .upcomingChallengeCount(challengeCountsDto.getUpcomingChallengeCount())
                .ongoingChallengeCount(challengeCountsDto.getOngoingChallengeCount())
                .completedChallengeCount(challengeCountsDto.getCompletedChallengeCount())
                .build();
    }
}
