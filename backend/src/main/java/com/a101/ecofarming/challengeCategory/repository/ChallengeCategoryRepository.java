package com.a101.ecofarming.challengeCategory.repository;

import com.a101.ecofarming.challengeCategory.entity.ChallengeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChallengeCategoryRepository extends JpaRepository<ChallengeCategory, Integer> {
    @Query("SELECT cc.title FROM ChallengeCategory cc WHERE cc.id = :id")
    String findTitleById(Integer id);
}
