package com.a101.ecofarming.proof.service;

import com.a101.ecofarming.challengeCategory.service.ChallengeCategoryService;
import com.a101.ecofarming.proof.dto.request.ProofUploadRequestDto;
import com.a101.ecofarming.proof.dto.response.ProofUploadResponseDto;
import com.a101.ecofarming.proof.entity.Proof;
import com.a101.ecofarming.proof.repository.ProofRepository;
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

@Service
public class ProofService {

    //@Value("${file.upload-dir}")
    //private String uploadDir; // 파일 업로드 경로

    @Autowired
    private ProofRepository proofRepository;

    public ProofUploadResponseDto uploadProof(ProofUploadRequestDto requestDto) {

        Integer challengeId = requestDto.getChallengeId();
        Integer userId = requestDto.getUserId();
        MultipartFile photo = requestDto.getPhoto();
        Integer duration = requestDto.getDuration();

        String originalFilename = photo.getOriginalFilename();
        String extension = "";

        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        String fileName = String.format("%s_%d%s", LocalDate.now(), userId, extension);
        String directoryPath = String.format("ProofPhotos/%d", challengeId);
        File directory = new File(directoryPath);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filePath = directoryPath + "/" + fileName;
        //System.out.println(filePath);
        try {
            photo.transferTo(new File(filePath));
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return new ProofUploadResponseDto(null, 0, "파일 저장에 실패했습니다.");
        }

        Proof proof = Proof.builder()
                .challengeId(challengeId)
                .userId(userId)
                .photoUrl(filePath)
                .isValid(1)
                .createdAt(LocalDate.now())
                .build();

        Proof savedProof = proofRepository.save(proof);

        return new ProofUploadResponseDto(savedProof.getProofId(), 100, "파일이 성공적으로 업로드되었습니다.");

    }
}
