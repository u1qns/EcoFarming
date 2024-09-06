package com.a101.ecofarming.challengeCategory.service;

import com.a101.ecofarming.challengeCategory.entity.ChallengeCategory;
import com.a101.ecofarming.challengeCategory.repository.ChallengeCategoryRepository;
import com.a101.ecofarming.proof.dto.response.ProofGuideResponseDto;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChallengeCategoryService {

    @Autowired
    private ChallengeCategoryRepository repository;

    public ProofGuideResponseDto getGuideInfo(Integer categoryId) {
        Optional<ChallengeCategory> category = repository.findById(categoryId);

        if(category.isPresent()) {
            return new ProofGuideResponseDto(
                    category.get().getGuideText(),
                    category.get().getRightGuidePhotoUrl(),
                    category.get().getWrongGuidePhotoUrl(),
                    "200"
            );
        }

        throw new EntityNotFoundException("Category not found for ID: " + categoryId);
    }
}
