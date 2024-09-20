package com.a101.ecofarming.challenge.service;

import com.a101.ecofarming.challenge.dto.response.ChallengeDto;
import com.a101.ecofarming.challenge.dto.response.ChallengeResponseDto;
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
    public ChallengeResponseDto findAllChallenge(){
        List<ChallengeDto> upcomingChallenges = challengeRepository.findUpcomingChallenge();
        List<ChallengeDto> ongoingChallenges = challengeRepository.findOngoingChallenge();

        return new ChallengeResponseDto(upcomingChallenges, ongoingChallenges);
    }


}
