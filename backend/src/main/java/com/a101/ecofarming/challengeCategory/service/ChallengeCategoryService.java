package com.a101.ecofarming.challengeCategory.service;

import com.a101.ecofarming.challenge.entity.Challenge;
import com.a101.ecofarming.challenge.repository.ChallengeRepository;
import com.a101.ecofarming.challengeCategory.entity.ChallengeCategory;
import com.a101.ecofarming.challengeCategory.repository.ChallengeCategoryRepository;
import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.proof.dto.response.ProofGuideResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.a101.ecofarming.global.exception.ErrorCode.CATEGORY_NOT_FOUND;
import static com.a101.ecofarming.global.exception.ErrorCode.CHALLENGE_NOT_FOUND;

@Service
public class ChallengeCategoryService {

    @Autowired
    private ChallengeCategoryRepository categoryRepository;

    @Autowired
    private ChallengeRepository challengeRepository;

    public ProofGuideResponseDto getGuideInfo(Integer challengeId) {
       Challenge challenge = challengeRepository.findById(challengeId)
               .orElseThrow(()->new CustomException(CHALLENGE_NOT_FOUND));

        ChallengeCategory category = categoryRepository.findById(challenge.getChallengeCategory().getId())
                .orElseThrow(()->new CustomException(CATEGORY_NOT_FOUND));

        return new ProofGuideResponseDto(
                category.getGuideText(),
                category.getRightGuidePhotoUrl(),
                category.getWrongGuidePhotoUrl()
        );
    }
}
