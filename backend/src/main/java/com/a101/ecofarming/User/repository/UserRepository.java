package com.a101.ecofarming.User.repository;

import com.a101.ecofarming.User.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}