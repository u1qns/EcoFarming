package com.a101.ecofarming.challenge.repository;

import com.a101.ecofarming.challenge.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {
    @Query("SELECT c.frequency FROM Challenge c WHERE c.id = :id")
    int findFrequencyById(@Param("id") Integer id);
}
