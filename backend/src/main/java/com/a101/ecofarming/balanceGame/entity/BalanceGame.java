package com.a101.ecofarming.balanceGame.entity;

import com.a101.ecofarming.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "balance_game")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BalanceGame extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "balance_id")
    private Integer balanceId;

    @Column(name = "option1_description", nullable = false)
    private String option1Description;

    @Column(name = "option2_description", nullable = false)
    private String option2Description;
}
