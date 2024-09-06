package com.a101.ecofarming.complaint.repository;

import com.a101.ecofarming.complaint.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {
}
