package com.a101.ecofarming.proof.service;

import com.a101.ecofarming.challenge.entity.Challenge;
import com.a101.ecofarming.challenge.repository.ChallengeRepository;
import com.a101.ecofarming.challengeCategory.service.ChallengeCategoryService;
import com.a101.ecofarming.proof.dto.request.ProofUploadRequestDto;
import com.a101.ecofarming.proof.dto.response.ProofDetailDto;
import com.a101.ecofarming.proof.dto.response.ProofInfoResponseDto;
import com.a101.ecofarming.proof.dto.response.ProofUploadResponseDto;
import com.a101.ecofarming.proof.entity.Proof;
import com.a101.ecofarming.proof.repository.ProofRepository;
import com.a101.ecofarming.user.entity.User;
import com.a101.ecofarming.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProofService {

    @Value("${file.upload-dir}")
    private String uploadDir; // 파일 업로드 경로

    @Autowired
    private ProofRepository proofRepository;
    @Autowired
    private ChallengeRepository challengeRepository;
    @Autowired
    private UserRepository userRepository;

    public ProofUploadResponseDto uploadProof(ProofUploadRequestDto requestDto) {

        Challenge challenge = challengeRepository.findById(requestDto.getChallengeId())
                .orElseThrow(() -> new RuntimeException("ChallengeId not found"));
        User user = userRepository.getById(requestDto.getUserId());

        MultipartFile photo = requestDto.getPhoto();
        Integer duration = requestDto.getDuration();

        String originalFilename = photo.getOriginalFilename();
        String extension = "";

        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        String fileName = String.format("%s_%d%s", LocalDate.now(), user.getId(), extension);
        String directoryPath = uploadDir + "/ProofPhotos/" + challenge.getId(); // uploadDir을 포함
        File directory = new File(directoryPath);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filePath = directoryPath + "/" + fileName;
        try {
            photo.transferTo(new File(filePath));
        } catch (IOException e) {
            return new ProofUploadResponseDto(null, 0);
        }

        Proof proof = Proof.builder()
                .challenge(challenge)
                .user(user)
                .photoUrl(filePath)
                .isValid(true)
                .build();

        proofRepository.save(proof);

        return new ProofUploadResponseDto(proof.getProofId(), 100);

    }

    public ProofInfoResponseDto getProofsByChallengeId(Integer challengeId) {
        List<Proof> proofs = proofRepository.findByChallengeId(challengeId);

        List<ProofDetailDto> proofDetails = proofs.stream()
                .map(proof -> new ProofDetailDto(
                        proof.getProofId(),
                        proof.getPhotoUrl(),
                        proof.getUser().getName(),
                        proof.getIsValid()
                ))
                .collect(Collectors.toList());

        return new ProofInfoResponseDto(proofDetails);
    }

}
