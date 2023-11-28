package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.TimeLine;

public interface TimeLineRepository extends JpaRepository<TimeLine, Long> {

}
