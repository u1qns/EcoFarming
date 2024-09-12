package com.a101.ecofarming.proof.service;

import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.challenge.entity.Challenge;
import com.a101.ecofarming.challenge.repository.ChallengeRepository;
import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.global.exception.ErrorCode;
import com.a101.ecofarming.proof.dto.request.ProofUploadRequestDto;
import com.a101.ecofarming.proof.dto.response.ProofDetailDto;
import com.a101.ecofarming.proof.dto.response.ProofInfoResponseDto;
import com.a101.ecofarming.proof.dto.response.ProofUploadResponseDto;
import com.a101.ecofarming.proof.entity.Proof;
import com.a101.ecofarming.proof.repository.ProofRepository;
import com.a101.ecofarming.user.entity.User;
import com.a101.ecofarming.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
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

@Slf4j
@Service
public class ProofService {

    private static final String PROOF_PHOTOS_DIR = "/ProofPhotos/";

    private final String uploadDir;
    private final ProofRepository proofRepository;
    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProofService(@Value("${file.upload-dir}") String uploadDir,
                        ProofRepository proofRepository,
                        ChallengeRepository challengeRepository,
                        UserRepository userRepository) {
        this.uploadDir = uploadDir;
        this.proofRepository = proofRepository;
        this.challengeRepository = challengeRepository;
        this.userRepository = userRepository;
    }

    public ProofUploadResponseDto uploadProof(ProofUploadRequestDto requestDto) {
        Challenge challenge = challengeRepository.findById(requestDto.getChallengeId())
                .orElseThrow(() -> new RuntimeException("ChallengeId not found"));
        User user = userRepository.getById(requestDto.getUserId());

        Integer proofId = saveProofFile(requestDto, challenge, user);
        Byte successRate = calculateSuccessRate(challenge, user);

        log.info("Proof uploaded successfully. Proof ID: {}, Success Rate: {}", proofId, successRate);

        return new ProofUploadResponseDto(proofId, successRate);
    }

    private Integer saveProofFile(ProofUploadRequestDto requestDto, Challenge challenge, User user)
            throws CustomException {
        MultipartFile photo = requestDto.getPhoto();
        String originalFilename = Optional.ofNullable(photo.getOriginalFilename())
                .orElseThrow(() -> {
                    return new CustomException(ErrorCode.FILE_NAME_NULL);
                });

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
            throw new CustomException(ErrorCode.FILE_UPLOAD_FAILED);
        }

        Proof proof = Proof.builder()
                .challenge(challenge)
                .user(user)
                .photoUrl(filePath)
                .isValid(true)
                .build();

        proofRepository.save(proof);

        return proof.getId();
    }

    private Byte calculateSuccessRate(Challenge challenge, User user) {
        Long proofCount = proofRepository.countByChallengeAndUser(challenge, user);
        log.info("Proof count: {}", proofCount);

        int frequency = challengeRepository.findFrequencyById(challenge.getId());
        log.info("Frequency: {}", frequency);

        if (frequency == 0) {
            log.warn("Frequency is zero. Returning 0 as success rate.");
            return 0;
        }

        return (byte) (((double) proofCount / frequency) * 100);
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
}
