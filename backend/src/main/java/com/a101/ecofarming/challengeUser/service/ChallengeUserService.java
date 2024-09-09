package com.a101.ecofarming.challengeUser.service;

import com.a101.ecofarming.challengeUser.dto.response.ChallengeUserResponseDto;
import com.a101.ecofarming.challengeUser.repository.ChallengeUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChallengeUserService {

    private final ChallengeUserRepository challengeUserRepository;

    @Transactional(readOnly = true)
    public List<ChallengeUserResponseDto> findChallengesByUserId(Integer userId, ChallengeStatus status) {
        return switch (status) {
            case UPCOMING -> challengeUserRepository.findUpcomingChallengesByUserId(userId);
            case ONGOING -> challengeUserRepository.findOngoingChallengesByUserId(userId);
            case COMPLETED -> challengeUserRepository.findCompletedChallengesByUserId(userId);
        };
    }
}
