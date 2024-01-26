package com.example.backend.controller;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTO.ChatPrivateDTO;
import com.example.backend.DTO.RoomPrivateDTO;
import com.example.backend.service.ChatPrivateService;
import com.example.backend.service.RoomPrivateService;

@CrossOrigin(origins =  "http://localhost:3000")
@RestController
@RequestMapping("api/v1/message")
public class MessageController {

	@Autowired
	private RoomPrivateService roomPrivateService;
	
	@Autowired
	private ChatPrivateService chatPrivateService;
	
	@GetMapping("/{roomID}")
	public ResponseEntity<List<ChatPrivateDTO>> getByUsers(@PathVariable("roomID") Long id) {
		RoomPrivateDTO roomPrivateDTO = this.roomPrivateService.getByID(id);
		List<ChatPrivateDTO> listChatPrivateDTO = this.chatPrivateService.getByRoomID(roomPrivateDTO.getId());
		return new ResponseEntity<>(listChatPrivateDTO, HttpStatus.OK);
	}
}
