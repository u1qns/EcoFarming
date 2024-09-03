package com.a101.ecofarming.complaint.entity;

import com.a101.ecofarming.proof.entity.Proof;
import com.a101.ecofarming.user.entity.User;
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

    @ManyToOne
    @JoinColumn(name = "proof_id", nullable = false)
    private Proof proof;

    @ManyToOne
    @JoinColumn(name = "complainer_id", nullable = false)
    private User user;

    @Column
    private String description;

    @Column
    private boolean aiPass;

    @Column
    private boolean adminPass;

}

