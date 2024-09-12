package com.a101.ecofarming.proof.repository;

import com.a101.ecofarming.challenge.entity.Challenge;
import com.a101.ecofarming.proof.entity.Proof;
import com.a101.ecofarming.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProofRepository extends JpaRepository<Proof, Integer> {
    List<Proof> findByChallengeId(Integer challengeId);

    List<Proof> findByChallengeAndUser(Challenge challenge, User user);
}

