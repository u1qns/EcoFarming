package com.a101.ecofarming.proof.service;

import com.a101.ecofarming.challenge.entity.Challenge;
import com.a101.ecofarming.challenge.repository.ChallengeRepository;
import com.a101.ecofarming.challengeUser.entity.ChallengeUser;
import com.a101.ecofarming.challengeUser.repository.ChallengeUserRepository;
import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.proof.dto.request.ProofUploadRequestDto;
import com.a101.ecofarming.proof.dto.response.ProofDetailDto;
import com.a101.ecofarming.proof.dto.response.ProofInfoResponseDto;
import com.a101.ecofarming.proof.dto.response.ProofUploadResponseDto;
import com.a101.ecofarming.proof.entity.Proof;
import com.a101.ecofarming.proof.repository.ProofRepository;
import com.a101.ecofarming.user.entity.User;
import com.a101.ecofarming.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import static com.a101.ecofarming.global.exception.ErrorCode.*;

@Slf4j
@Service
public class ProofService {

    private static final String PROOF_PHOTOS_DIR = "/ProofPhotos/";

    private final String uploadDir;
    private final ProofRepository proofRepository;
    private final ChallengeRepository challengeRepository;
    private final ChallengeUserRepository challengeUserRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProofService(@Value("${file.upload-dir}") String uploadDir,
                        ProofRepository proofRepository,
                        ChallengeRepository challengeRepository,
                        ChallengeUserRepository challengeUserRepository,
                        UserRepository userRepository) {
        this.uploadDir = uploadDir;
        this.proofRepository = proofRepository;
        this.challengeRepository = challengeRepository;
        this.challengeUserRepository = challengeUserRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ProofUploadResponseDto uploadProof(ProofUploadRequestDto requestDto) {
        log.info("Proof upload request received for userId: {} and challengeId: {}",
                requestDto.getUserId(),
                requestDto.getChallengeId());

        // 챌린지 및 사용자 조회
        Challenge challenge = challengeRepository.findById(requestDto.getChallengeId())
                .orElseThrow(() -> new CustomException(CHALLENGE_NOT_FOUND));
        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        // 챌린지 인증 저장
        String filePath = saveProofFile(requestDto, user, challenge);
        Proof proof = Proof.builder()
                .user(user)
                .challenge(challenge)
                .photoUrl(filePath)
                .isValid(true)
                .build();
        proofRepository.save(proof);

        // 챌린지 사용자 조회 및 성공률 계산
        ChallengeUser challengeUser = challengeUserRepository.findByChallengeAndUser(challenge, user)
                .orElseThrow(()-> new CustomException(CHALLENGE_USER_NOT_FOUND));
        Byte successRate = calculateSuccessRate(user, challenge);
        challengeUser.setSuccessRate(successRate);
        challengeUserRepository.save(challengeUser);

        log.info("Proof uploaded successfully. Proof ID: {}, Success Rate: {}", proof.getId(), successRate);
        return new ProofUploadResponseDto(proof.getId(), successRate);
    }

    private String saveProofFile(ProofUploadRequestDto requestDto, User user, Challenge challenge)
            throws CustomException {
        MultipartFile photo = requestDto.getPhoto();
        String originalFilename = Optional.ofNullable(photo.getOriginalFilename())
                .orElseThrow(() -> new CustomException(FILE_NAME_NULL));

        String extension = originalFilename.contains(".") ? originalFilename.substring(originalFilename.lastIndexOf(".")) : "";
        String fileName = String.format("%s_%d%s", LocalDate.now(), user.getId(), extension);
        String directoryPath = uploadDir + PROOF_PHOTOS_DIR + challenge.getId();

        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filePath = directoryPath + "/" + fileName;
        try {
            photo.transferTo(new File(filePath));
        } catch (IOException e) {
            log.error("File upload failed: {}", e.getMessage());
            throw new CustomException(FILE_UPLOAD_FAILED);
        }

        // 반환할 URL 경로 (클라이언트가 접근할 수 있는 경로)
        String urlPath = PROOF_PHOTOS_DIR + challenge.getId() + "/" + fileName;

        // URL 경로 반환
        return urlPath;
    }

    private Byte calculateSuccessRate(User user, Challenge challenge) {
        Long proofCount = proofRepository.countByChallengeAndUserAndIsValidTrue(challenge, user);
        log.info("Proof count: {}", proofCount);

        int frequency = challengeRepository.findFrequencyById(challenge.getId());
        log.info("Frequency: {}", frequency);

        if (frequency == 0) {
            log.warn("Frequency is zero. Returning 0 as success rate.");
            return 0;
        }

        double successRate = ((double) proofCount / frequency) * 100;
        if (successRate > 100) {
            return 100;
        }

        return (byte) successRate;
    }

    public ProofInfoResponseDto getProofsByChallengeId(Integer challengeId, Pageable pageable) {
        Page<Proof> proofs = proofRepository.findByChallengeIdOrderByCreatedAtDesc(challengeId, pageable);

        List<ProofDetailDto> proofDetails = proofs.stream()
                .map(proof -> new ProofDetailDto(
                        proof.getId(),
                        proof.getPhotoUrl(),
                        proof.getUser().getName(),
                        proof.getIsValid(),
                        proof.getCreatedAt()
                ))
                .collect(Collectors.toList());

        return new ProofInfoResponseDto(proofDetails);
    }

    public ProofInfoResponseDto getProofsByChallengeIdAndUserId(Integer challengeId, Integer userId, Pageable pageable) {
        Page<Proof> proofs = proofRepository.findByChallengeIdAndUserIdOrderByCreatedAtDesc(challengeId, userId, pageable);

        List<ProofDetailDto> proofDetails = proofs.stream()
                .map(proof -> new ProofDetailDto(
                        proof.getId(),
                        proof.getPhotoUrl(),
                        proof.getUser().getName(),
                        proof.getIsValid(),
                        proof.getCreatedAt()
                ))
                .collect(Collectors.toList());

        return new ProofInfoResponseDto(proofDetails);
    }
}
