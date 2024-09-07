package com.a101.ecofarming.user.service;

import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.user.dto.response.AmountResponseDto;
import com.a101.ecofarming.user.entity.User;
import com.a101.ecofarming.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.a101.ecofarming.global.exception.ErrorCode.*;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public AmountResponseDto findUserMyPage(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        return new AmountResponseDto(user.getAmount(), user.getPrizeAmount());
    }
}
