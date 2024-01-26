package com.example.backend.controller;

//import com.involveininnovation.chat.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.backend.DTO.ChatDTO;
import com.example.backend.DTO.ChatPrivateDTO;
import com.example.backend.service.ChatPrivateService;
import com.example.backend.service.ChatService;

@Controller
public class ChatPrivateController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    
    @Autowired
    private ChatPrivateService chatPrivateService;


	@MessageMapping("/chat/room/{roomId}")
	@SendTo("/topic/room/{roomId}")
	public ChatPrivateDTO sendRoomMessage(@Payload ChatPrivateDTO message, @DestinationVariable String roomId) {
		System.out.println("check" + message);
		this.chatPrivateService.create(message);
		return message;
	}

}                                                            