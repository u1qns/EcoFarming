package com.a101.ecofarming.User.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "`User`")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false)
    private int money;

    @Column(nullable = false)
    private int prizeMoney;
}
