package com.a101.ecofarming.global.notification.mattermost;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
@Getter
@Setter
@ConfigurationProperties(prefix = "webhook.mattermost")
public class MattermostProperties {
    private final Report report = new Report();
    private final Error error = new Error();

    @Getter
    @Setter
    public static class Report {
        private String url;
        private String priority;
    }

    @Getter
    @Setter
    public static class Error {
        private String url;
        private String priority;
    }

    private String footer = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
}