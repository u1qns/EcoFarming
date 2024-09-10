package com.a101.ecofarming.challengeUser.batch.reader;

import com.a101.ecofarming.challengeUser.dao.ChallengeUserDao;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.database.builder.JdbcCursorItemReaderBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.sql.DataSource;

@Configuration
@RequiredArgsConstructor
public class ChallengeSettlementReader {

    private final DataSource dataSource;

    @Bean
    @StepScope
    public ItemReader<ChallengeUserDao> failureUserReader(@Value("#{jobParameters['challengeId']}") Long challengeId) {
        String sql = "SELECT * FROM challenge_user WHERE success_rate < 100 AND challenge_id = ?";
        return createItemReader(sql, challengeId, "challengeUserReader");
    }

    @Bean
    @StepScope
    public ItemReader<ChallengeUserDao> successUserReader(@Value("#{jobParameters['challengeId']}") Long challengeId) {
        String sql = "SELECT * FROM challenge_user WHERE success_rate = 100 AND challenge_id = ?";
        return createItemReader(sql, challengeId, "successfulUserReader");
    }

    private ItemReader<ChallengeUserDao> createItemReader(String sql, Long challengeId, String readerName) {
        return new JdbcCursorItemReaderBuilder<ChallengeUserDao>()
                .dataSource(dataSource)
                .name(readerName)
                .sql(sql)
                .preparedStatementSetter(ps -> ps.setLong(1, challengeId))
                .rowMapper(new ChallengeUserDaoRowMapper())
                .build();
    }
}
