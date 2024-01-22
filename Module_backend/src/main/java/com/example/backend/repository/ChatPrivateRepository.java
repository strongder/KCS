package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.AutoChat;
import com.example.backend.entity.ChatPrivate;
import java.util.List;
import com.example.backend.entity.RoomPrivate;


public interface ChatPrivateRepository extends JpaRepository<ChatPrivate, Long>{
	
	List<ChatPrivate> getByRoomPrivate(RoomPrivate roomPrivate);
	
}
