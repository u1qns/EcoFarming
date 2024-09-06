package com.a101.ecofarming.user.entity;

import com.a101.ecofarming.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
class UserTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void userTest() throws InterruptedException {
        User user = User.builder()
                .name("abc")
                .email("abc@gmail.com")
                .money(0)
                .prizeMoney(0)
                .build();

        userRepository.save(user);
        assertThat(user.getName()).isEqualTo("abc");
        assertThat(user.getMoney()).isEqualTo(0);
        assertThat(user.getPrizeMoney()).isEqualTo(0);
        System.out.println("created " + user.getCreatedAt());
        System.out.println("updated " + user.getUpdatedAt());
        System.out.println("userId " + user.getId());
        Thread.sleep(1000);

        // 기존 유저 조회 후 새로운 객체로 변경 (builder 사용)
        User updatedUser = User.builder()
                .id(user.getId()) // 기존 ID 유지
                .name("def")      // 이름 변경
                .email(user.getEmail()) // 기존 이메일 유지
                .money(user.getMoney()) // 기존 money 유지
                .prizeMoney(user.getPrizeMoney())// 기존 prizeMoney 유지
                .build();

        // 변경된 유저 저장
        userRepository.save(updatedUser);

        // 업데이트된 유저 정보 출력
        User savedUpdatedUser = userRepository.findById(user.getId()).orElseThrow();
        System.out.println("created " + savedUpdatedUser.getCreatedAt());
        System.out.println("updated " + savedUpdatedUser.getUpdatedAt());
    }

}