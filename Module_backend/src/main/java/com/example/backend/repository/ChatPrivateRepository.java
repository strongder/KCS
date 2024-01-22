package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.backend.entity.AutoChat;
import com.example.backend.entity.ChatPrivate;
import java.util.List;
import com.example.backend.entity.RoomPrivate;


public interface ChatPrivateRepository extends JpaRepository<ChatPrivate, Long>{
	
//	@Query(value = "Select c from ChatPrivate c where c.roomPrivate = :roomPrivate orderBy c.timeSend DESC")
	List<ChatPrivate> getByRoomPrivate(RoomPrivate roomPrivate);
	
}
