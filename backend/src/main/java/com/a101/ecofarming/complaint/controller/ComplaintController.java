package com.a101.ecofarming.complaint.controller;

import com.a101.ecofarming.complaint.dto.AIAnalysisRequestDto;
import com.a101.ecofarming.complaint.dto.ComplaintRequestDto;
import com.a101.ecofarming.complaint.dto.ComplaintResponseDto;
import com.a101.ecofarming.complaint.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/complaints")
@RequiredArgsConstructor
public class ComplaintController {
    private final ComplaintService complaintService;

    @PostMapping("/proof")
    public ResponseEntity<ComplaintResponseDto> createComplaint(
            @RequestBody ComplaintRequestDto complaintRequestDto) {
        ComplaintResponseDto complaintResponseDto = complaintService.createComplaint(complaintRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(complaintResponseDto);
    }

    @PostMapping("/proof/AI")
    public ResponseEntity<Void> aiAnalysis(
            @RequestBody AIAnalysisRequestDto aiAnalysisRequestDto) {
        complaintService.updateAIPass(aiAnalysisRequestDto);
        return ResponseEntity.ok().build();
    }

    // 전체 Complaint 목록 조회 API
    @GetMapping
    public ResponseEntity<List<ComplaintResponseDto>> getAllComplaints() {
        List<ComplaintResponseDto> complaints = complaintService.getAllComplaints();
        return ResponseEntity.ok(complaints);
    }

    // TEST ----------------------------------------------------------------------------------------------
    @GetMapping("/test-error")
    public void testErrorNotification() {
        throw new RuntimeException("Test Exception"); // 의도적으로 예외 발생
    }
}
