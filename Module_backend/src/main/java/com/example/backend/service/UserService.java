package com.example.backend.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.DTO.UserDTO;
import com.example.backend.entity.User;

public interface UserService {

	List<UserDTO> getAll();
	
	UserDTO getByID(Long id);
	
	UserDTO getByEmail(String email);
	
	UserDTO create(UserDTO userDTO);
	
	UserDTO update(Long id, UserDTO userDTO);
	
	UserDTO delete(Long id);

	UserDTO updateAvt(Long id);
	
//	UserDTO updateAvt(Long id);
	
}
