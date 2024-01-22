package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.User;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

//	@Query("select u from user u where u.email = :email or u.phone = :phone")
	List<User> findByEmailOrPhone(String email, String phone);
	
	Optional<User> findByEmail(String email);
	
	Optional<User> findByPhone(String phone);
	
//	Optional<User> findByUsername(String ema)
}
