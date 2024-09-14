package com.a101.ecofarming.challengeUser.batch.reader;

import com.a101.ecofarming.challengeUser.dao.ChallengeUserDao;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ChallengeUserDaoRowMapper implements RowMapper<ChallengeUserDao> {

    @Override
    public ChallengeUserDao mapRow(ResultSet rs, int rowNum) throws SQLException {
        return ChallengeUserDao.builder()
                .challengeUserId(rs.getInt("challenge_user_id"))
                .betAmount(rs.getInt("bet_amount"))
                .balanceGamePick(rs.getByte("balance_game_pick"))
                .returnAmount(rs.getInt("return_amount"))
                .successRate(rs.getByte("success_rate"))
                .challengeId(rs.getInt("challenge_id"))
                .userId(rs.getInt("user_id"))
                .build();
    }
}
