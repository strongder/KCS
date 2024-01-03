package com.example.backend.serviceImpl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.DTO.AutoChatDTO;
import com.example.backend.entity.AutoChat;
import com.example.backend.exception.AutoChatException;
import com.example.backend.repository.AutoChatRepository;
import com.example.backend.service.AutoChatService;

@Service
public class AutoChatServiceImpl implements AutoChatService{

	@Autowired
	private AutoChatRepository autoChatRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public List<AutoChatDTO> getAll() {
		// TODO Auto-generated method stub
		List<AutoChat> listAutoChat = this.autoChatRepository.findAll();
		List<AutoChatDTO> listAutoChatDTOs = listAutoChat.stream().map(autoChat -> this.modelMapper.map(autoChat, AutoChatDTO.class)).toList();
		return listAutoChatDTOs;
	}

	@Override
	public AutoChatDTO getByID(Long id) {
		// TODO Auto-generated method stub
		Optional<AutoChat> autoChat = this.autoChatRepository.findById(id);
		if(autoChat.get() != null) {
			AutoChatDTO autoChatDTO = this.modelMapper.map(autoChat, AutoChatDTO.class);
			return autoChatDTO;
		} else {
			throw new AutoChatException("Khong tim thay tin nhan tra loi tu dong");
		}
	}

	@Override
	public AutoChatDTO create(AutoChatDTO autoChatDTO) {
		// TODO Auto-generated method stub
		Date date = new Date();
		autoChatDTO.setIsDelete(false);
		AutoChat autoChat = this.modelMapper.map(autoChatDTO, AutoChat.class);
		autoChat.setCreateDate(date);
		autoChat.setUpdateDate(date);
		this.autoChatRepository.save(autoChat);
		return autoChatDTO;
	}

	@Override
	public AutoChatDTO update(Long id, AutoChatDTO autoChatDTO) {
		// TODO Auto-generated method stub
		Optional<AutoChat> autoChat = this.autoChatRepository.findById(id);
		if(autoChat.get() != null) {
			Date date = new Date();
			AutoChat autoChatSaved = this.modelMapper.map(autoChatDTO, AutoChat.class);
			autoChatSaved.setId(id);
			autoChatSaved.setUpdateDate(date);
			this.autoChatRepository.save(autoChatSaved);
			return autoChatDTO;
		} else {
			throw new AutoChatException("Khong tim thay tin nhan tra loi tu dong");
		}
	}

	@Override
	public AutoChatDTO delete(Long id) {
		// TODO Auto-generated method stub
		Optional<AutoChat> autoChat = this.autoChatRepository.findById(id);
		if(autoChat.get() != null) {
			Date date = new Date();
			autoChat.get().setIsDelete(true);
			autoChat.get().setUpdateDate(date);
			AutoChatDTO autoChatDTO = this.modelMapper.map(autoChat.get(), AutoChatDTO.class);
			this.autoChatRepository.save(autoChat.get());
			return autoChatDTO;
		} else {
			throw new AutoChatException("Khong tim thay tin nhan tra loi tu dong");
		}
	}

}
