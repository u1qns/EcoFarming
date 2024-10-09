package com.a101.ecofarming.global.notification;

import com.a101.ecofarming.complaint.entity.Complaint;
import com.a101.ecofarming.global.notification.mattermost.MattermostService;
import com.a101.ecofarming.global.notification.fcm.FCMService;
import com.a101.ecofarming.global.notification.fcm.dto.FCMMessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationManager {

    private final MattermostService mmSender;
    private final FCMService fcmSender;

    public void sendNotification(Exception e, String url, String params) {
        mmSender.sendErrorNotification(e, url, params);
    }

    public void sendNotification(Complaint complaint) {
        mmSender.sendComplaintNotification(complaint);
    }


    public void sendNotification(FCMMessageDto fcmMessageDto, String topic) {
        fcmSender.sendMessage(fcmMessageDto, topic);
    }

}
