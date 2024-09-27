package com.a101.ecofarming.global.notification;

import com.a101.ecofarming.global.notification.mattermost.MattermostProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class NotificationConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public MattermostProperties mattermostProperties() {
        return new MattermostProperties();
    }
}
