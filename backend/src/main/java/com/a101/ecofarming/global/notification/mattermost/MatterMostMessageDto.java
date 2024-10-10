package com.a101.ecofarming.global.notification.mattermost;

import com.a101.ecofarming.complaint.entity.Complaint;
import com.google.gson.annotations.SerializedName;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.io.StringWriter;
import java.io.PrintWriter;

@Getter
@Setter
public class MatterMostMessageDto {

    private String username; // 사용 불가 (관리자 인증 필요)
    private Priority priority;
    private String text;
    private Props props;
    @SerializedName("icon_emoji")
    private String iconEmoji;
    private List<Attachment> attachments;

    public MatterMostMessageDto() {
        this.props = new Props();
        this.attachments = new ArrayList<>();
    }

    public void setPriority(String priority, boolean requestedAck) {
        this.priority = new Priority(priority, requestedAck);
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void addProps(String cardContent) {
        props = new Props(cardContent);
    }
    public void addProps(Exception e) {
        props = new Props(e);
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Priority {
        private String priority;
        private boolean requestedAck;
    }

    @Getter
    public static class Attachments {
        private Props props;
        private List<Attachment> attachments;

        public Attachments() {
            attachments = new ArrayList<>();
        }

        public Attachments(Attachment attachment) {
            this();
            this.attachments.add(attachment);
        }

        public void addAttachment(Attachment attachment) {
            this.attachments.add(attachment);
        }
    }

    @Getter
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Attachment {
        @SerializedName("author_name")
        private String authorName;
        @SerializedName("author_icon")
        private String authorIcon;
        private String channel;
        private String pretext;
        private String color;
        private String title;
        @SerializedName("title_link")
        private String titleLink;
        private String text;
        @SerializedName("image_url")
        private String imageUrl;
        private String footer;

        public Attachment setComplaintInfo(Complaint complaint) {
            StringBuilder sb = new StringBuilder();
            sb.append("**Complaint ID:** ").append(complaint.getId()).append("\n")
                    .append("**Proof ID:** ").append(complaint.getProof() != null ? complaint.getProof().getId() : "N/A").append("\n")
                    .append("**User ID:** ").append(complaint.getUser() != null ? complaint.getUser().getId() : "N/A").append("\n")
                    .append("**Description:** ").append(complaint.getDescription() != null ? complaint.getDescription() : "No description provided").append("\n")
                    .append("**AI Pass:** ").append(complaint.getAiPass()).append("\n")
                    .append("**Admin Pass:** ").append(complaint.getAdminPass()).append("\n");

            this.title = "검수가 필요한 신고";
            this.titleLink = "https://j11a101.p.ssafy.io"; // 임시
            this.color = "#fb6f92";
            this.imageUrl = "https://em-content.zobj.net/source/apple/391/globe-showing-asia-australia_1f30f.png"; // 나중에 인증샷으로 교체 필요
            this.text = sb.toString();

            return this;
        }

        public Attachment setErrorInfo(Exception e, String url, String params) {
            this.title = "# " + e.getClass().getSimpleName();
            this.text = "";

            this.addExceptionInfo(e, url, params);
            return this;
        }

        private Attachment addExceptionInfo(Exception e) {
            this.text = text
                    + "**Error Message**"
                    + '\n' + '\n'
                    + "```" + e.getMessage() + "```" +
                    '\n' + '\n';
            return this;
        }

        private Attachment addExceptionInfo(Exception e, String url) {
            this.addExceptionInfo(e);
            this.text = text + "**Reqeust URL**" + '\n' + '\n' + url + '\n' + '\n';
            return this;
        }

        private Attachment addExceptionInfo(Exception e, String url, String params) {
            this.addExceptionInfo(e, url);
            this.text = text + "**Parameters**" + '\n' + '\n' + params + '\n' + '\n';
            return this;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Props {
        private String card;

        public Props(String cardContent) {
            this.card = cardContent;
        }

        public Props(Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));

            StringBuilder text = new StringBuilder();
            text.append("**Stack Trace**\n\n")
                    .append("```java\n")
                    .append(sw.toString(), 0, Math.min(5500, sw.toString().length()));
            if (sw.toString().length() > 5500) {
                text.append("\n...");
            }
            text.append("```\n\n");

            this.card = text.toString();
        }
    }
}
