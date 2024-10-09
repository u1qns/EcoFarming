package com.a101.ecofarming.complaint.repository;

import com.a101.ecofarming.complaint.entity.Complaint;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {
    List<Complaint> findByUserId(Integer userId, Sort sort);
}
