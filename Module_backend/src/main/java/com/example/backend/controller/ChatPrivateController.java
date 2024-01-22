package com.example.backend.controller;

//import com.involveininnovation.chat.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
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

//    @MessageMapping("/message")
//    @SendTo("/chatroom/public")
//    public ChatDTO receiveMessage(@Payload ChatDTO message){
//        return message;
//    }145263+
    

    @MessageMapping("/private-message")
    public ChatPrivateDTO recMessage(@Payload ChatPrivateDTO message){
    	System.out.print("Private-message");
        simpMessagingTemplate.convertAndSendToUser(message.getRoomPrivateID() + "","/private",message);
        System.out.println(message.toString());
//        this.chat.save();
        this.chatPrivateService.create(message);
        return message;
    }
    
    
}                                                            
