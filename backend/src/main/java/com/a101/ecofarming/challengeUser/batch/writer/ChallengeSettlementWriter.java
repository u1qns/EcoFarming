package com.a101.ecofarming.challengeUser.batch.writer;

import com.a101.ecofarming.challengeUser.dao.ChallengeUserDao;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@RequiredArgsConstructor
public class ChallengeSettlementWriter {

    private final DataSource dataSource;

    @Bean
    public JdbcBatchItemWriter<ChallengeUserDao> failureUserWriter() {
        return new JdbcBatchItemWriterBuilder<ChallengeUserDao>()
                .dataSource(dataSource)
                .sql("UPDATE challenge_user SET return_amount = :returnAmount WHERE challenge_user_id = :challengeUserId")
                .beanMapped()
                .build();
    }

    @Bean
    public JdbcBatchItemWriter<ChallengeUserDao> successUserWriter() {
        return new JdbcBatchItemWriterBuilder<ChallengeUserDao>()
                .dataSource(dataSource)
                .sql("UPDATE user SET prize_amount = prize_amount + (:returnAmount - :betAmount) WHERE user_id = :userId")
                .beanMapped()
                .build();
    }
}
