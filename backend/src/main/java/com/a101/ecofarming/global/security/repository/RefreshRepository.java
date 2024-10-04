package com.a101.ecofarming.global.security.repository;

import com.a101.ecofarming.global.security.dto.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshRepository extends CrudRepository<RefreshToken, String> {
}
