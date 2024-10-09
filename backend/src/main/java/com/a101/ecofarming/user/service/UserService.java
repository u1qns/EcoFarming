package com.a101.ecofarming.user.service;

import com.a101.ecofarming.challengeCategory.repository.ChallengeCategoryRepository;
import com.a101.ecofarming.challengeUser.dto.response.ChallengeCountsDto;
import com.a101.ecofarming.challengeUser.repository.ChallengeUserRepository;
import com.a101.ecofarming.complaint.entity.Complaint;
import com.a101.ecofarming.complaint.repository.ComplaintRepository;
import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.user.dto.request.JoinRequestDto;
import com.a101.ecofarming.proof.entity.Proof;
import com.a101.ecofarming.proof.repository.ProofRepository;
import com.a101.ecofarming.user.dto.response.MyComplaintsResponseDto;
import com.a101.ecofarming.user.dto.response.MyPageResponseDto;
import com.a101.ecofarming.user.entity.User;
import com.a101.ecofarming.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.a101.ecofarming.global.exception.ErrorCode.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final ChallengeUserRepository challengeUserRepository;
    private final ComplaintRepository complaintRepository;
    private final ProofRepository proofRepository;
    private final ChallengeCategoryRepository challengeCategoryRepository;

    @Transactional(readOnly = true)
    public MyPageResponseDto findUserMyPage() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        ChallengeCountsDto challengeCountsDto = challengeUserRepository.countChallengesByUserId(user.getId());

        return MyPageResponseDto.builder()
                .amount(user.getAmount())
                .prizeAmount(user.getPrizeAmount())
                .upcomingChallengeCount(challengeCountsDto.getUpcomingChallengeCount())
                .ongoingChallengeCount(challengeCountsDto.getOngoingChallengeCount())
                .completedChallengeCount(challengeCountsDto.getCompletedChallengeCount())
                .build();
    }

    public void join(JoinRequestDto request) {
        Boolean isExist = userRepository.existsByEmail(request.getEmail());
        if (isExist) {
            throw new CustomException(EMAIL_ALREADY_EXIST);
        }

        User newUser = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(bCryptPasswordEncoder.encode(request.getPassword()))
                .amount(0)
                .prizeAmount(0)
                .build();

        userRepository.save(newUser);
    }

    public List<MyComplaintsResponseDto> getMyComplaints() {
        log.info("나의 신고 내역 조회");
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        List<Complaint> complaints = complaintRepository.findByUserId(user.getId(),
                Sort.by(Sort.Direction.DESC, "createdAt"));

        return complaints.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private MyComplaintsResponseDto convertToDto(Complaint complaint) {
        Proof proof = proofRepository.findById(complaint.getProof().getId())
                .orElseThrow(() -> new CustomException(PROOF_NOT_FOUND));

        String challengeTitle = challengeCategoryRepository.findTitleById(
                proof.getChallenge().getChallengeCategory().getId()
        );

        Boolean isApproved = complaint.getAdminPass();
        if(isApproved == null) {
            isApproved = complaint.getAiPass();
        }

        return MyComplaintsResponseDto.builder()
                .complaintId(complaint.getId())
                .title(challengeTitle)
                .description(complaint.getDescription())
                .photoUrl(proof.getPhotoUrl())
                .isApproved(isApproved)
                .complaintDate(proof.getCreatedAt())
                .build();
    }
}
