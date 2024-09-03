package com.a101.ecofarming.complaint.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "complaint")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer complaintId;

    @Column(nullable = false)
    private Integer proofId;

    @Column(nullable = false)
    private Integer complainerId;

    @Column
    private String description;

    @Column
    private Boolean aiPass;

    @Column
    private Boolean adminPass;

}

