package com.a101.ecofarming.global.notification.mattermost;

import com.a101.ecofarming.complaint.entity.Complaint;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static com.a101.ecofarming.global.notification.mattermost.MatterMostMessageDto.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class MattermostService {

    private final RestTemplate restTemplate;
    private final MattermostProperties mmProperties;

    public void sendComplaintNotification(Complaint complaint) {
        MatterMostMessageDto messageDto = new MatterMostMessageDto();
        Attachment attachment = Attachment.builder()
                .footer(mmProperties.getFooter())
                .build()
                .setComplaintInfo(complaint);
        messageDto.getAttachments().add(attachment);

        String payload = convertToJson(messageDto);
        sendMessage(mmProperties.getReport().getUrl(), payload);
    }

    public void sendErrorNotification(Exception e, String url, String params) {
        MatterMostMessageDto messageDto = new MatterMostMessageDto();
        messageDto.addProps(e);

        Attachment attachment = Attachment.builder()
                .footer(mmProperties.getFooter())
                .build()
                .setErrorInfo(e, url, params);
        messageDto.getAttachments().add(attachment);

        String payload = convertToJson(messageDto);
        sendMessage(mmProperties.getError().getUrl(), payload);
    }

    @SneakyThrows
    private void sendMessage(String url, String payload) {
        try {
            log.debug("payload : \n{}", payload);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Object> request = new HttpEntity<>(payload, headers);
            restTemplate.postForObject(url, request, String.class);
        } catch (Exception e) {
            log.error("#### MattermostService : {}", e.getMessage());
        }
    }

    private String convertToJson(MatterMostMessageDto messageDto) {
        return new Gson().toJson(messageDto);
    }
}
