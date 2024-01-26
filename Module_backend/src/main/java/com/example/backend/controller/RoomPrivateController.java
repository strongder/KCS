package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTO.RoomPrivateDTO;
import com.example.backend.service.RoomPrivateService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/room-private")
public class RoomPrivateController {

	@Autowired
	private RoomPrivateService roomPrivateService;
	
	@GetMapping("/{id1}/{id2}")
	public ResponseEntity<RoomPrivateDTO> getRoomByUser(@PathVariable("id1") Long id1, @PathVariable("id2") Long id2) {
		RoomPrivateDTO roomPrivateDTO = this.roomPrivateService.getByUser1IDAndUser2ID(id1, id2);
		return new ResponseEntity<>(roomPrivateDTO, HttpStatus.OK);
	}
	
//	@PostMapping()
}
