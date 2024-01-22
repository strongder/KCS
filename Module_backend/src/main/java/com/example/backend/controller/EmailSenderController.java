package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTO.EmailSenderDTO;
import com.example.backend.entity.EmailSender;
import com.example.backend.service.EmailSenderService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/sendEmail")
public class EmailSenderController {

	@Autowired
	private EmailSenderService emailSenderService;
	
	@GetMapping("")
	public ResponseEntity<EmailSenderDTO> getByVerification(@RequestBody Long verification) {
		return new ResponseEntity<>(emailSenderService.getByVerification(verification), HttpStatus.OK);
	}
	
	@PostMapping("")
	public ResponseEntity<?> sendEmail(@RequestBody String email) {
		System.out.println(email);
		emailSenderService.create(email);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
}
