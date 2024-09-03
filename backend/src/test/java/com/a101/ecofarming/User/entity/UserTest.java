package com.a101.ecofarming.User.entity;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.*;

class UserTest {

    @Test
    public void userTest(){
        User user = User.builder()
                .name("abc")
                .email("abc@gmail.com")
                .build();

        assertThat(user.getName()).isEqualTo("abc");
        assertThat(user.getMoney()).isEqualTo(0);
        assertThat(user.getPrizeMoney()).isEqualTo(0);
    }

}