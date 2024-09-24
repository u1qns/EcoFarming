package com.a101.ecofarming.global.notification;

import com.a101.ecofarming.complaint.entity.Complaint;
import com.a101.ecofarming.global.notification.mattermost.MattermostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationManager {

    private final MattermostService mmSender;

    public void sendNotification(Exception e, String url, String params) {
        mmSender.sendErrorNotification(e, url, params);
    }

    public void sendNotification(Complaint complaint) {
        mmSender.sendComplaintNotification(complaint);
    }
}
