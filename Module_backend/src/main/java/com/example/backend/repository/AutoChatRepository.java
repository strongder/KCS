package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.AutoChat;

public interface AutoChatRepository extends JpaRepository<AutoChat, Long> {

}
