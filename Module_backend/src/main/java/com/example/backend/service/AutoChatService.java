package com.example.backend.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.DTO.AutoChatDTO;
import com.example.backend.entity.AutoChat;

public interface AutoChatService  {
	
	List<AutoChatDTO> getAll();
	
	AutoChatDTO getByID(Long id);
	
	AutoChatDTO create(AutoChatDTO autoChatDTO);
	
	AutoChatDTO update(Long id, AutoChatDTO autoChatDTO);
	
	AutoChatDTO delete(Long id);
}
