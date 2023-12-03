package com.example.backend.service;

import com.example.backend.DTO.EmailSenderDTO;

public interface EmailSenderService {
	
	EmailSenderDTO getByVerification(Long verification);
	
	void create(String email);
	
	void delete();
	
}
