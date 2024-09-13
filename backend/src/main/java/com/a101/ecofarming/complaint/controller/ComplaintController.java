package com.a101.ecofarming.complaint.controller;

import com.a101.ecofarming.complaint.dto.ComplaintResponseDto;
import com.a101.ecofarming.complaint.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/complaints")
@RequiredArgsConstructor
public class ComplaintController {
    private final ComplaintService complaintService;

    @PostMapping("/proofs/{proofId}")
    public ResponseEntity<ComplaintResponseDto> createComplaint(
            @PathVariable Integer proofId,
            @RequestParam Integer userId,
            @RequestParam String description) {
        ComplaintResponseDto complaintResponseDto = complaintService.createComplaint(proofId, userId, description);
        return ResponseEntity.ok(complaintResponseDto);
    }

    // 전체 Complaint 목록 조회 API
    @GetMapping
    public ResponseEntity<List<ComplaintResponseDto>> getAllComplaints() {
        List<ComplaintResponseDto> complaints = complaintService.getAllComplaints();
        return ResponseEntity.ok(complaints);
    }
}
