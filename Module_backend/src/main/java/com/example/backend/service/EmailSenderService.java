package com.example.backend.service;

import com.example.backend.DTO.EmailSenderDTO;
import com.example.backend.DTO.UserDTO;

public interface EmailSenderService {
	
	Boolean getVerificationByEmail(String email);
	
	EmailSenderDTO create(String email);
	
//	void delete();
	
}
