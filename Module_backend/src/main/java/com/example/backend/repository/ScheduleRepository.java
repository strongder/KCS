package com.example.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.backend.entity.Schedule;
import java.util.List;
import java.util.Optional;
import java.util.Date;


public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

//	@Query(value = "select s from schedule s where s.date := date")
	Schedule findByDate(Date date);
}
