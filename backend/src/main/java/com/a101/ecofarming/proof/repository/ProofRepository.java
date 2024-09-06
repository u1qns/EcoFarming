package com.a101.ecofarming.proof.repository;

import com.a101.ecofarming.proof.entity.Proof;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProofRepository extends JpaRepository<Proof, String> {
}

