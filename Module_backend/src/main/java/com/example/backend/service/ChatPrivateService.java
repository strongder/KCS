package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.DTO.ChatPrivateDTO;
import com.example.backend.entity.ChatPrivate;

public interface ChatPrivateService {

	List<ChatPrivateDTO> getByRoomID(Long id);
	
	ChatPrivateDTO create(ChatPrivateDTO chatPrivateDTO);
}
