package com.a101.ecofarming.challenge.service;

import com.a101.ecofarming.challenge.dto.response.TotalChallengeDto;
import com.a101.ecofarming.challenge.dto.response.TotalChallengesResponseDto;
import com.a101.ecofarming.challenge.repository.ChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;

    @Transactional(readOnly = true)
    public TotalChallengesResponseDto findAllChallenge() {
        List<TotalChallengeDto> upcomingChallenges = challengeRepository.findUpcomingChallenge();
        List<TotalChallengeDto> ongoingChallenges = challengeRepository.findOngoingChallenge();

        return new TotalChallengesResponseDto(upcomingChallenges, ongoingChallenges);
    }


}
