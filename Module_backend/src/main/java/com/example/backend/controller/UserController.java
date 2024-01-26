package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTO.UserDTO;
import com.example.backend.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/user")
@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("")
	public ResponseEntity<List<UserDTO>> getAll() {
		List<UserDTO> listUserDTO = this.userService.getAll();
		return new ResponseEntity<>(listUserDTO, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<UserDTO> getByID(@PathVariable("id") Long id) {
		UserDTO userDTO = this.userService.getByID(id);
		return new ResponseEntity<>(userDTO, HttpStatus.OK);
	}
	

	
	@GetMapping("/user-current/{id}")
	public ResponseEntity<UserDTO> getCurrentUser(@PathVariable("id") Long id) {
		UserDTO userDTO = this.userService.getByID(id);
		return new ResponseEntity<>(userDTO, HttpStatus.OK);
	}
	

	@PutMapping("/update-avt/{id}")
		public ResponseEntity<UserDTO> updateAvt(@PathVariable("id") Long id) {
			return new ResponseEntity<>(this.userService.updateAvt(id), HttpStatus.OK);
		}
	
	@PostMapping("")
	public ResponseEntity<UserDTO> create(@RequestBody UserDTO userDTO) {
//		System.out.println(userDTO);
		this.userService.create(userDTO);
		return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<UserDTO> update(@PathVariable("id") Long id, @RequestBody UserDTO userDTO) {
		return new ResponseEntity<>(this.userService.update(id, userDTO), HttpStatus.OK);
	}
	
	@PutMapping("/update-current/{id}")
	public ResponseEntity<UserDTO> updateCurrent(@PathVariable("id") Long id, @RequestBody UserDTO userDTO) {
		return new ResponseEntity<>(this.userService.update(id, userDTO), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<UserDTO> delete(@PathVariable("id") Long id) {
		return new ResponseEntity<>(this.userService.delete(id), HttpStatus.OK);
	}
	
	
}
