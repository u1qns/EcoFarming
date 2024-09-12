package com.a101.ecofarming.complaint.service;

import com.a101.ecofarming.complaint.dto.ComplaintResponseDto;
import com.a101.ecofarming.complaint.entity.Complaint;
import com.a101.ecofarming.complaint.repository.ComplaintRepository;
import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.proof.entity.Proof;
import com.a101.ecofarming.proof.repository.ProofRepository;
import com.a101.ecofarming.user.entity.User;
import com.a101.ecofarming.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.a101.ecofarming.global.exception.ErrorCode.PROOF_NOT_FOUND;
import static com.a101.ecofarming.global.exception.ErrorCode.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ComplaintService {
    private final ComplaintRepository complaintRepository;
    private final ProofRepository proofRepository;
    private final UserRepository userRepository;

    @Transactional
    public ComplaintResponseDto createComplaint(Integer proofId, Integer userId, String description) {

        Proof proof = proofRepository.findById(proofId)
                .orElseThrow(() -> new CustomException(PROOF_NOT_FOUND));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Complaint complaint = Complaint.builder()
                .proof(proof)
                .user(user)
                .description(description)
                .aiPass(null)
                .adminPass(null)
                .build();
        Complaint savedComplaint = complaintRepository.save(complaint);


        return ComplaintResponseDto.builder()
                .id(savedComplaint.getId())
                .description(savedComplaint.getDescription())
                .aiPass(savedComplaint.getAiPass())
                .adminPass(savedComplaint.getAdminPass())
                .proofId(savedComplaint.getProof().getId())
                .userId(savedComplaint.getUser().getId())
                .build();
    }

    public List<ComplaintResponseDto> getAllComplaints() {
        List<Complaint> complaints = complaintRepository.findAll();
        return complaints.stream()
                .map(complaint -> ComplaintResponseDto.builder()
                        .id(complaint.getId())
                        .description(complaint.getDescription())
                        .aiPass(complaint.getAiPass())
                        .adminPass(complaint.getAdminPass())
                        .proofId(complaint.getProof().getId())
                        .userId(complaint.getUser().getId())
                        .build())
                .collect(Collectors.toList());
    }
}
