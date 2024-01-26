package com.example.backend.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.DTO.ResourcesDTO;
import com.example.backend.entity.Resources;

public interface ResourcesService {

	List<ResourcesDTO> getAllFile();

	ResourcesDTO getFileByID(Long ID);

	Resources UploadFile(MultipartFile image, Long id);
	
	ResourcesDTO getFileByCreateBy(String createBy);

}
