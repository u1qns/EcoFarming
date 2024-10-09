package com.a101.ecofarming.challengeUser.service;

import com.a101.ecofarming.challenge.dto.response.NoParticipantChallengeResponseDto;
import com.a101.ecofarming.challenge.dto.response.ParticipantChallengeResponseDto;
import com.a101.ecofarming.challenge.dto.response.PaymentRequestDto;
import com.a101.ecofarming.challenge.dto.response.PaymentResponseDto;
import com.a101.ecofarming.challenge.entity.Challenge;
import com.a101.ecofarming.challenge.repository.ChallengeRepository;
import com.a101.ecofarming.challengeUser.dto.response.ChallengeUserResponseDto;
import com.a101.ecofarming.challengeUser.entity.ChallengeUser;
import com.a101.ecofarming.challengeUser.repository.ChallengeUserRepository;
import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.proof.dto.response.ProofDetailDto;
import com.a101.ecofarming.proof.repository.ProofRepository;
import com.a101.ecofarming.user.entity.User;
import com.a101.ecofarming.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static com.a101.ecofarming.global.exception.ErrorCode.CHALLENGE_NOT_FOUND;
import static com.a101.ecofarming.global.exception.ErrorCode.USER_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class ChallengeUserService {

    private final ChallengeUserRepository challengeUserRepository;
    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;
    private final ProofRepository proofRepository;

    @Transactional(readOnly = true)
    public List<ChallengeUserResponseDto> findChallengesByUserId(ChallengeStatus status) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Integer userId = userRepository.findByEmail(email)
                .map(User::getId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        return switch (status) {
            case UPCOMING -> challengeUserRepository.findUpcomingChallengesByUserId(userId);
            case ONGOING -> challengeUserRepository.findOngoingChallengesByUserId(userId);
            case COMPLETED -> challengeUserRepository.findCompletedChallengesByUserId(userId);
        };
    }

    @Transactional(readOnly = true)
    public Object getChallengeDetailsByUser(Integer challengeId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        // 챌린지와 유저 존재 확인
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new CustomException(CHALLENGE_NOT_FOUND));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        // 유저가 해당 챌린지에 참여 중인지 확인
        ChallengeUser challengeUser = challengeUserRepository.findByChallengeAndUser(challenge, user).orElse(null);


        // 유저가 참가 중인 경우
        if (challengeUser != null) {

            Integer prizeAmount = null;
            Integer totalBetAmountOption1 = null;
            Integer totalBetAmountOption2 = null;
            if (isChallengeCompleted(challengeUser)) {
                prizeAmount = challengeUser.getReturnAmount() - challengeUser.getBetAmount();
                totalBetAmountOption1 = challenge.getTotalBetAmountOption1();
                totalBetAmountOption2 = challenge.getTotalBetAmountOption2();
            }


            List<ProofDetailDto> proofs = proofRepository.findByChallengeAndUser(challenge, user)
                    .stream()
                    .map(proof -> new ProofDetailDto().builder()
                            .proofId(proof.getId())
                            .isValid(proof.getIsValid())
                            .photoUrl(proof.getPhotoUrl())
                            .createdAt(proof.getCreatedAt())
                            .build())
                    .collect(Collectors.toList());


            // 빌더 패턴으로 참여자 정보 객체를 생성하고 반환
            return ParticipantChallengeResponseDto.builder()
                    .type("ParticipantChallengeResponseDto")
                    .id(challenge.getId())
                    .title(challenge.getChallengeCategory().getTitle())
                    .description(challenge.getChallengeCategory().getDescription())
                    .startDate(challenge.getStartDate())
                    .endDate(challenge.getEndDate())
                    .frequency(challenge.getFrequency())
                    .duration(challenge.getDuration())
                    .userCount(Long.valueOf(challenge.getUserCount()))
                    .guideText(challenge.getChallengeCategory().getGuideText())
                    .balanceId(challenge.getBalanceGame().getBalanceId())
                    .balanceGamePick(challengeUser.getBalanceGamePick())
                    .proofs(proofs)
                    .totalBetAmountOption1(totalBetAmountOption1)
                    .totalBetAmountOption2(totalBetAmountOption2)
                    .prizeAmount(prizeAmount)
                    .thumbPhotoUrl(challenge.getChallengeCategory().getThumbPhotoUrl())
                    .build();

        } else {
            // 빌더 패턴으로 비참여자 정보 객체를 생성하고 반환
            return NoParticipantChallengeResponseDto.builder()
                    .type("NoParticipantChallengeResponseDto")
                    .id(challenge.getId())
                    .title(challenge.getChallengeCategory().getTitle())
                    .description(challenge.getChallengeCategory().getDescription())
                    .startDate(challenge.getStartDate())
                    .endDate(challenge.getEndDate())
                    .frequency(challenge.getFrequency())
                    .duration(challenge.getDuration())
                    .userCount(Long.valueOf(challenge.getUserCount()))
                    .guideText(challenge.getChallengeCategory().getGuideText())
                    .balanceId(challenge.getBalanceGame().getBalanceId())
                    .option1Description(challenge.getBalanceGame().getOption1Description())
                    .option2Description(challenge.getBalanceGame().getOption2Description())
                    .totalBetAmountOption1(challenge.getTotalBetAmountOption1())
                    .totalBetAmountOption2(challenge.getTotalBetAmountOption2())
                    .thumbPhotoUrl(challenge.getChallengeCategory().getThumbPhotoUrl())
                    .build();
        }
    }

    public PaymentResponseDto goToPayment(Integer challengeId, Integer userId) {

        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new CustomException(CHALLENGE_NOT_FOUND));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        return PaymentResponseDto.builder().
                id(challengeId)
                .id(challenge.getId())
                .title(challenge.getChallengeCategory().getTitle())
                .description(challenge.getChallengeCategory().getDescription())
                .startDate(challenge.getStartDate())
                .endDate(challenge.getEndDate())
                .frequency(challenge.getFrequency())
                .duration(challenge.getDuration())
                .userCount(challengeUserRepository.countUserByChallengeId(challengeId))
                .balanceId(challenge.getBalanceGame().getBalanceId())
                .option1Description(challenge.getBalanceGame().getOption1Description())
                .option2Description(challenge.getBalanceGame().getOption2Description())
                .totalBetAmountOption1(challenge.getTotalBetAmountOption1())
                .totalBetAmountOption2(challenge.getTotalBetAmountOption2())
                .amount(user.getAmount())
                .build();

    }

    public void submitPayment(Integer challengeId, Integer userId, PaymentRequestDto paymentRequestDto) {
        // Challenge 엔티티 조회
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new CustomException(CHALLENGE_NOT_FOUND));

        // User 엔티티 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        //1. 유저의 보유금액 충분한지
        int chargingAmount;
        if (user.getAmount() >= paymentRequestDto.getBetAmount()) {
            // 보유금액 >= 배팅액: 보유금액 - 배팅액
            user.setAmount(user.getAmount() - paymentRequestDto.getBetAmount());
            chargingAmount = 0;
        } else {
            // 보유금액 < 배팅액: 충전금액 계산
            chargingAmount = paymentRequestDto.getBetAmount() - user.getAmount();
            user.setAmount(0);
        }


        // balanceGamePick에 따라 발란스에 베팅액 추가하는 로직
        if (paymentRequestDto.getBalanceGamePick() == 1) {
            challenge.setTotalBetAmountOption1(
                    challenge.getTotalBetAmountOption1() + paymentRequestDto.getBetAmount());
        } else if (paymentRequestDto.getBalanceGamePick() == 2) {
            challenge.setTotalBetAmountOption2(
                    challenge.getTotalBetAmountOption2() + paymentRequestDto.getBetAmount());
        } else {
            throw new IllegalArgumentException("balanceGamePick 오류");
        }
        // Challenge 참여 유저 수 증가
        challenge.setUserCount(challenge.getUserCount() + 1);

        // ChallengeUser 생성
        ChallengeUser challengeUser = ChallengeUser.builder()
                .challenge(challenge)
                .user(user)
                .betAmount(paymentRequestDto.getBetAmount())
                .balanceGamePick(paymentRequestDto.getBalanceGamePick())
                .returnAmount(paymentRequestDto.getBetAmount())
                .build();

        challengeRepository.save(challenge);
        challengeUserRepository.save(challengeUser);
        userRepository.save(user);


    }


    //종료된 챌린지인지 확인
    private boolean isChallengeCompleted(ChallengeUser challengeUser) {
        return challengeUser.getChallenge().getEndDate().isBefore(LocalDate.now());
    }
}
