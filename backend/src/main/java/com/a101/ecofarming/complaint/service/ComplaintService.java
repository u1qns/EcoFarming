package com.a101.ecofarming.complaint.service;

import com.a101.ecofarming.complaint.dto.AIAnalysisRequestDto;
import com.a101.ecofarming.complaint.dto.ComplaintRequestDto;
import com.a101.ecofarming.complaint.dto.ComplaintResponseDto;
import com.a101.ecofarming.complaint.entity.Complaint;
import com.a101.ecofarming.complaint.repository.ComplaintRepository;
import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.global.notification.NotificationManager;
import com.a101.ecofarming.proof.entity.Proof;
import com.a101.ecofarming.proof.repository.ProofRepository;
import com.a101.ecofarming.user.entity.User;
import com.a101.ecofarming.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.a101.ecofarming.global.exception.ErrorCode.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ComplaintService {
    private final ComplaintRepository complaintRepository;
    private final ProofRepository proofRepository;
    private final UserRepository userRepository;
    private final NotificationManager notificationManager;

    @Transactional
    public ComplaintResponseDto createComplaint(ComplaintRequestDto complaintRequestDto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Proof proof = proofRepository.findById(complaintRequestDto.getProofId())
                .orElseThrow(() -> new CustomException(PROOF_NOT_FOUND));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Complaint complaint = Complaint.builder()
                .proof(proof)
                .user(user)
                .description(complaintRequestDto.getDescription())
                .adminPass(null)
                .build();
        Complaint savedComplaint = complaintRepository.save(complaint);

        return convertToDto(savedComplaint);
    }

    public void updateAIPass(AIAnalysisRequestDto aiAnalysisRequestDto) {
        log.info("{}번 인증샷 신고에 대한 AI 판독 결과 : {}",
                aiAnalysisRequestDto.getComplaintId(), aiAnalysisRequestDto.getAiPass());

        Complaint complaint = complaintRepository.findById(aiAnalysisRequestDto.getComplaintId())
                .orElseThrow(()-> new CustomException(COMPLATINT_NOT_FOUND));
        complaint.setAiPass(aiAnalysisRequestDto.getAiPass());

        // 인증샷 isValid 업데이트
        Proof proof = complaint.getProof();
        proof.setIsValid(aiAnalysisRequestDto.getAiPass());
        proofRepository.save(proof);
        
        // AI 검증이 실패했을 때만 요청
        if (!aiAnalysisRequestDto.getAiPass()) {
            notifyAdmin(complaint);
        }
    }

    public List<ComplaintResponseDto> getAllComplaints() {
        log.info("전체 신고 조회 요청");

        List<Complaint> complaints = complaintRepository.findAll();
        log.info("총 {}개의 신고가 조회되었습니다.", complaints.size());

        return complaints.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ComplaintResponseDto convertToDto(Complaint complaint) {
        return ComplaintResponseDto.builder()
                .id(complaint.getId())
                .description(complaint.getDescription())
                .adminPass(complaint.getAdminPass())
                .proofId(complaint.getProof().getId())
                .userId(complaint.getUser().getId())
                .build();
    }

    // 관리자에게 알림을 전송하는 메서드
     private void notifyAdmin(Complaint complaint) {
        notificationManager.sendNotification(complaint);
    }
}