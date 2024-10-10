package com.a101.ecofarming.complaint.entity;

import com.a101.ecofarming.global.entity.BaseEntity;
import com.a101.ecofarming.proof.entity.Proof;
import com.a101.ecofarming.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "complaint", indexes = {
        @Index(name = "idx_complaint_user_id", columnList = "user_id")
})
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Complaint extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "complaint_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "proof_id", nullable = false)
    private Proof proof;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column
    private String description;

    @Column(name = "ai_pass")
    private Boolean aiPass;

    @Column(name = "admin_pass")
    private Boolean adminPass;

    public void setAiPass(Boolean aiPass) {
        this.aiPass = aiPass;
    }
}

