package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTO.LoginRequest;
import com.example.backend.DTO.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import com.example.backend.utils.JwtUtils;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/auth")
public class LoginController {

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("")
	public ResponseEntity<?> Login(@RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		if (authentication.isAuthenticated()) {
			return new ResponseEntity<>(JwtUtils.generateToken(loginRequest.getUsername()), HttpStatus.OK);
		}
		return null;

	}
	
	@GetMapping("/{id}")
	public ResponseEntity<UserDTO> getByEmail(@PathVariable("id") Long id) {
		return new ResponseEntity<>(this.userService.getByID(id), HttpStatus.OK);
	}
	
}
