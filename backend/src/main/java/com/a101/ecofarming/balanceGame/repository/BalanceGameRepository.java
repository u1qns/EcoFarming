package com.a101.ecofarming.balanceGame.repository;

import com.a101.ecofarming.balanceGame.entity.BalanceGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BalanceGameRepository extends JpaRepository<BalanceGame, Integer> {

    // SpringBatch, 전체 밸런스 게임 개수 찾기
    @Query("select COUNT(b) from BalanceGame b")
    int getTotalBalanceGameCount();
}
