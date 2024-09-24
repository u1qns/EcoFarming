package com.a101.ecofarming.user.repository;

import com.a101.ecofarming.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
