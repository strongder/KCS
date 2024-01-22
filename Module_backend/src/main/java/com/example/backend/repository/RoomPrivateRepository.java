package com.example.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.AutoChat;
import com.example.backend.entity.RoomPrivate;

@Repository
public interface RoomPrivateRepository extends JpaRepository<RoomPrivate, Long> {

	List<RoomPrivate> getByUser1ID(Long id);

	@Query(value = "SELECT R FROM RoomPrivate R WHERE (R.user1ID = :id1 AND R.user2ID = :id2) OR (R.user1ID = :id2 AND R.user2ID = :id1)")
	Optional<RoomPrivate> getByUsers(Long id1, Long id2);
}
