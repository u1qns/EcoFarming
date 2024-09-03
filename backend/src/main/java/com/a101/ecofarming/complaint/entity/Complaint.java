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
    @Column(name = "complaint_id")
    private int id;

    @Column(nullable = false)
    private int proofId;

    @Column(nullable = false)
    private int complainerId;

    @Column
    private String description;

    @Column
    private boolean aiPass;

    @Column
    private boolean adminPass;

}

