package com.example.backend.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.DTO.ChatPrivateDTO;
import com.example.backend.entity.ChatPrivate;
import com.example.backend.entity.RoomPrivate;
import com.example.backend.repository.ChatPrivateRepository;
import com.example.backend.repository.RoomPrivateRepository;
import com.example.backend.service.ChatPrivateService;

@Service
public class ChatPrivateServiceImpl implements ChatPrivateService {

	@Autowired
	private ChatPrivateRepository chatPrivateRepository;
	
	@Autowired
	private RoomPrivateRepository roomPrivateRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public List<ChatPrivateDTO> getByRoomID(Long id) {
		// TODO Auto-generated method stub
		Optional<RoomPrivate> roomPrivate = this.roomPrivateRepository.findById(id);
		List<ChatPrivate> listChatPrivate = this.chatPrivateRepository.getByRoomPrivate(roomPrivate.get());
		List<ChatPrivateDTO> listChatPrivateDTO = listChatPrivate.stream().map((item) -> this.modelMapper.map(item, ChatPrivateDTO.class)).toList();
		return listChatPrivateDTO;
	}

	@Override
	public ChatPrivateDTO create(ChatPrivateDTO chatPrivateDTO) {
		// TODO Auto-generated method stub
		ChatPrivate chatPrivate = this.modelMapper.map(chatPrivateDTO, ChatPrivate.class);
		this.chatPrivateRepository.save(chatPrivate);
		return chatPrivateDTO;
	}

}
