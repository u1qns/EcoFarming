package com.a101.ecofarming.challenge.repository;

import com.a101.ecofarming.challenge.dto.response.ChallengeDto;
import com.a101.ecofarming.challenge.dto.response.ChallengeDto;
import com.a101.ecofarming.challenge.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {
    @Query("SELECT c.frequency FROM Challenge c WHERE c.id = :id")
    int findFrequencyById(@Param("id") Integer id);

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

    // SpringBatch 오늘 끝나는 챌린지 찾기
    @Query("select c from Challenge c where c.endDate = :today")
    List<Challenge> findChallengesEndingByDate(@Param("today") LocalDate today);

    // SpringBatch 현재 진행 중인 챌린지 중 가장 큰 밸런스 게임 ID 찾기
    @Query("select COALESCE(MAX(c.balanceGame.id), 0) from Challenge c where :today Between c.startDate And c.endDate")
    int findMaxBalanceId(@Param("today") LocalDate today);

    @Query("SELECT COUNT(cu) FROM ChallengeUser cu WHERE cu.challenge.id = :challengeId")
    Long countUserByChallengeId(@Param("challengeId") Integer challengeId);
}
