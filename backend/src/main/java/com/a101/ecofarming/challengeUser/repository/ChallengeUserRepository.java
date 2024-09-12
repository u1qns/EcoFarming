package com.a101.ecofarming.challengeUser.repository;

import com.a101.ecofarming.challengeUser.dto.response.ChallengeUserResponseDto;
import com.a101.ecofarming.challengeUser.entity.ChallengeUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChallengeUserRepository extends JpaRepository<ChallengeUser, Integer> {

    // 참여 예정인 챌린지 조회
    @Query("SELECT new com.a101.ecofarming.challengeUser.dto.response.ChallengeUserResponseDto(" +
            "cu.id, cc.title, c.startDate, c.endDate, c.frequency, c.duration, cu.successRate, COUNT(DISTINCT cu2)) " +
            "FROM ChallengeUser cu " +
            "JOIN cu.challenge c " +
            "JOIN c.challengeCategory  cc " +
            "JOIN ChallengeUser cu2 ON cu2.challenge.challengeCategory.id = c.challengeCategory.id " +
            "AND cu2.user.id = cu.user.id " +
            "WHERE cu.user.id = :userId " +
            "AND c.startDate > CURRENT_DATE " +
            "GROUP BY cu.id, cc.title, c.startDate, c.endDate, c.frequency, c.duration, cu.successRate")
    List<ChallengeUserResponseDto> findUpcomingChallengesByUserId(@Param("userId") Integer userId);

    // 참여 중인 챌린지 조회
    @Query("SELECT new com.a101.ecofarming.challengeUser.dto.response.ChallengeUserResponseDto(" +
            "cu.id, cc.title, c.startDate, c.endDate, c.frequency, c.duration, cu.successRate, COUNT(DISTINCT cu2)) " +
            "FROM ChallengeUser cu " +
            "JOIN cu.challenge c " +
            "JOIN c.challengeCategory  cc " +
            "JOIN ChallengeUser cu2 ON cu2.challenge.challengeCategory.id = c.challengeCategory.id " +
            "AND cu2.user.id = cu.user.id " +
            "WHERE cu.user.id = :userId " +
            "AND CURRENT_DATE BETWEEN c.startDate AND c.endDate " +
            "GROUP BY cu.id, cc.title, c.startDate, c.endDate, c.frequency, c.duration, cu.successRate")
    List<ChallengeUserResponseDto> findOngoingChallengesByUserId(@Param("userId") Integer userId);

    // 참여 완료한 챌린지 조회
    @Query("SELECT new com.a101.ecofarming.challengeUser.dto.response.ChallengeUserResponseDto(" +
            "cu.id, cc.title, c.startDate, c.endDate, c.frequency, c.duration, cu.successRate, COUNT(DISTINCT cu2)) " +
            "FROM ChallengeUser cu " +
            "JOIN cu.challenge c " +
            "JOIN c.challengeCategory  cc " +
            "JOIN ChallengeUser cu2 ON cu2.challenge.challengeCategory.id = c.challengeCategory.id " +
            "AND cu2.user.id = cu.user.id " +
            "WHERE cu.user.id = :userId " +
            "AND c.endDate < CURRENT_DATE " +
            "GROUP BY cu.id, cc.title, c.startDate, c.endDate, c.frequency, c.duration, cu.successRate")
    List<ChallengeUserResponseDto> findCompletedChallengesByUserId(@Param("userId") Integer userId);

    ChallengeUser findByUserIdAndChallengeId(Integer id, Integer id1);
}
