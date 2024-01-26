package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.EmailSender;
import java.util.List;
import java.util.Optional;


@Repository
public interface EmailSenderRepository extends JpaRepository<EmailSender, Long>{

	
	@Query(value = "SELECT e\r\n"
			+ "FROM EmailSender e where e.email = :email \r\n"
			+ "ORDER BY e.createDate DESC\r\n"
			+ "LIMIT 1")
	Optional<EmailSender> findByEmailUser(String email);
	
	@Query(value = "select e from EmailSender e where e.isDelete = false")
	List<EmailSender> findByIsDeleteFalse();
	
}

