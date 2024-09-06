package com.a101.ecofarming.balanceGame.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;

@Entity
@Table(name = "balance_game")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BalanceGame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "balance_id")
    private Integer balanceId;

    @Column(name = "option1_description", nullable = false)
    private String option1Description;

    @Column(name = "option2_description", nullable = false)
    private String option2Description;

}
