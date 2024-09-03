package com.a101.ecofarming.challenge.repository;

import com.a101.ecofarming.challenge.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {
}
