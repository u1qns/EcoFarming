package com.a101.ecofarming.challenge.repository;

import com.a101.ecofarming.challenge.dto.response.ChallengeDto;
import com.a101.ecofarming.challenge.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {

    // 진행 중인 챌린지
    @Query("SELECT new com.a101.ecofarming.challenge.dto.response.ChallengeDto(c.id, c.challengeCategory.title, c.duration, c.frequency, COUNT(cu.user)) " +
            "FROM Challenge c " +
            "LEFT JOIN ChallengeUser cu ON c.id = cu.challenge.id " +
            "WHERE c.startDate <= CURRENT_DATE AND c.endDate >= CURRENT_DATE " +
            "GROUP BY c.id, c.challengeCategory.title, c.duration, c.frequency")
    List<ChallengeDto> findOngoingChallenge();

    // 시작 전인 챌린지
    @Query("SELECT new com.a101.ecofarming.challenge.dto.response.ChallengeDto(c.id, c.challengeCategory.title, c.duration, c.frequency, COUNT(cu.user)) " +
            "FROM Challenge c " +
            "LEFT JOIN ChallengeUser cu ON c.id = cu.challenge.id " +
            "WHERE c.startDate > CURRENT_DATE " +
            "GROUP BY c.id, c.challengeCategory.title, c.duration, c.frequency")
    List<ChallengeDto> findUpcomingChallenge();
}
