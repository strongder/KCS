package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.DTO.ResourcesDTO;
import com.example.backend.entity.Resources;

public interface ResourcesRepository extends JpaRepository<Resources, Long> {

	Optional<Resources> getByCreateBy(String createBy);
	
}
