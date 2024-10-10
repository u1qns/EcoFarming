package com.a101.ecofarming.challengeUser.repository;

import com.a101.ecofarming.challenge.entity.Challenge;
import com.a101.ecofarming.challengeUser.dto.response.ChallengeCountsDto;
import com.a101.ecofarming.challengeUser.dto.response.ChallengeUserResponseDto;
import com.a101.ecofarming.challengeUser.entity.ChallengeUser;
import com.a101.ecofarming.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChallengeUserRepository extends JpaRepository<ChallengeUser, Integer> {

    // 참여 예정인 챌린지 조회
    @Query("SELECT new com.a101.ecofarming.challengeUser.dto.response.ChallengeUserResponseDto(" +
            "c.id, cc.title, c.startDate, c.endDate, c.frequency, c.duration, cu.successRate, cc.thumbPhotoUrl, cu.returnAmount, COUNT(DISTINCT cu2)) " +
            "FROM ChallengeUser cu " +
            "JOIN cu.challenge c " +
            "JOIN c.challengeCategory cc " +
            "JOIN ChallengeUser cu2 ON cu2.challenge.challengeCategory.id = c.challengeCategory.id " +
            "AND cu2.user.id = cu.user.id " +
            "WHERE cu.user.id = :userId " +
            "AND c.startDate > CURRENT_DATE " +
            "GROUP BY c.id, cc.title, c.startDate, c.endDate, c.frequency, c.duration, cu.successRate, cc.thumbPhotoUrl, cu.returnAmount")
    List<ChallengeUserResponseDto> findUpcomingChallengesByUserId(@Param("userId") Integer userId);

    // 참여 중인 챌린지 조회
    @Query("SELECT new com.a101.ecofarming.challengeUser.dto.response.ChallengeUserResponseDto(" +
            "c.id, cc.title, c.startDate, c.endDate, c.frequency, c.duration, cu.successRate, cc.thumbPhotoUrl, cu.returnAmount, COUNT(DISTINCT cu2)) " +
            "FROM ChallengeUser cu " +
            "JOIN cu.challenge c " +
            "JOIN c.challengeCategory cc " +
            "JOIN ChallengeUser cu2 ON cu2.challenge.challengeCategory.id = c.challengeCategory.id " +
            "AND cu2.user.id = cu.user.id " +
            "WHERE cu.user.id = :userId " +
            "AND CURRENT_DATE BETWEEN c.startDate AND c.endDate " +
            "GROUP BY c.id, cc.title, c.startDate, c.endDate, c.frequency, c.duration, cu.successRate, cc.thumbPhotoUrl, cu.returnAmount")
    List<ChallengeUserResponseDto> findOngoingChallengesByUserId(@Param("userId") Integer userId);

    // 참여 완료한 챌린지 조회
    @Query("SELECT new com.a101.ecofarming.challengeUser.dto.response.ChallengeUserResponseDto(" +
            "c.id, cc.title, c.startDate, c.endDate, c.frequency, c.duration, cu.successRate, cc.thumbPhotoUrl, cu.returnAmount, COUNT(DISTINCT cu2)) " +
            "FROM ChallengeUser cu " +
            "JOIN cu.challenge c " +
            "JOIN c.challengeCategory cc " +
            "JOIN ChallengeUser cu2 ON cu2.challenge.challengeCategory.id = c.challengeCategory.id " +
            "AND cu2.user.id = cu.user.id " +
            "WHERE cu.user.id = :userId " +
            "AND c.endDate < CURRENT_DATE " +
            "GROUP BY c.id, cc.title, c.startDate, c.endDate, c.frequency, c.duration, cu.successRate, cc.thumbPhotoUrl, cu.returnAmount")
    List<ChallengeUserResponseDto> findCompletedChallengesByUserId(@Param("userId") Integer userId);

    Optional<ChallengeUser> findByChallengeAndUser(Challenge challenge, User user);

    @Query("SELECT COUNT(cu) FROM ChallengeUser cu WHERE cu.challenge.id = :challengeId")
    Long countUserByChallengeId(@Param("challengeId") Integer challengeId);

    @Query("SELECT new com.a101.ecofarming.challengeUser.dto.response.ChallengeCountsDto ( " +
            "COALESCE(SUM(CASE WHEN c.startDate > CURRENT_DATE THEN 1 ELSE 0 END), 0), " +
            "COALESCE(SUM(CASE WHEN c.startDate <= CURRENT_DATE AND CURRENT_DATE <= c.endDate THEN 1 ELSE 0 END), 0), " +
            "COALESCE(SUM(CASE WHEN c.endDate < CURRENT_DATE THEN 1 ELSE 0 END), 0)) " +
            "FROM ChallengeUser cu " +
            "JOIN cu.challenge c " +
            "WHERE cu.user.id = :userId")
    ChallengeCountsDto countChallengesByUserId(@Param("userId") Integer userId);
}
