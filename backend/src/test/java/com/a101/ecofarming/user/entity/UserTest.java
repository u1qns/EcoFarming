package com.a101.ecofarming.user.entity;

import com.a101.ecofarming.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class UserTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void userTest() throws InterruptedException {
        User user = User.builder()
                .name("abc")
                .email("abc@gmail.com")
                .amount(0)
                .prizeAmount(0)
                .build();

        userRepository.save(user);
        assertThat(user.getName()).isEqualTo("abc");
        assertThat(user.getAmount()).isEqualTo(0);
        assertThat(user.getPrizeAmount()).isEqualTo(0);
        Thread.sleep(1000);

        // 기존 유저 조회 후 새로운 객체로 변경 (builder 사용)
        User updatedUser = User.builder()
                .id(user.getId())
                .name("def")
                .email(user.getEmail())
                .amount(user.getAmount())
                .prizeAmount(user.getPrizeAmount())
                .build();

        // 변경된 유저 저장
        userRepository.save(updatedUser);

        // 업데이트된 유저 정보 출력
        User savedUpdatedUser = userRepository.findById(user.getId()).orElseThrow();
        assertThat(savedUpdatedUser.getUpdatedAt()).isNotEqualTo(savedUpdatedUser.getCreatedAt());
    }

}