package com.example.backend.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.DTO.RoomPrivateDTO;
import com.example.backend.entity.RoomPrivate;
import com.example.backend.repository.RoomPrivateRepository;
import com.example.backend.service.RoomPrivateService;

@Service
public class RoomPrivateServiceImpl implements RoomPrivateService{

	@Autowired
	private RoomPrivateRepository roomPrivateRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public List<RoomPrivateDTO> getByUser1ID(Long id) {
		// TODO Auto-generated method stub
		List<RoomPrivate> listRoomPrivate = this.roomPrivateRepository.getByUser1ID(id);
		List<RoomPrivateDTO> listRoomPrivateDTO = listRoomPrivate.stream().map((item) -> modelMapper.map(item, RoomPrivateDTO.class)).toList();
		return listRoomPrivateDTO;
	}

	@Override
	public RoomPrivateDTO create(RoomPrivateDTO roomPrivateDTO) {
		// TODO Auto-generated method stub
		RoomPrivate roomPrivate = this.modelMapper.map(roomPrivateDTO, RoomPrivate.class);
		this.roomPrivateRepository.save(roomPrivate);
		return roomPrivateDTO;
	}

	@Override
	public RoomPrivateDTO getByUser1IDAndUser2ID(Long id1, Long id2) {
		// TODO Auto-generated method stub
		Optional<RoomPrivate> roomPrivate = this.roomPrivateRepository.getByUsers(id1, id2);
		RoomPrivateDTO roomPrivateDTO = this.modelMapper.map(roomPrivate, RoomPrivateDTO.class);
		return roomPrivateDTO;
	}

	@Override
	public RoomPrivateDTO getByID(Long id) {
		// TODO Auto-generated method stub
		Optional<RoomPrivate> roomPrivate = this.roomPrivateRepository.findById(id);
		return this.modelMapper.map(roomPrivate, RoomPrivateDTO.class);
	}

	
}
