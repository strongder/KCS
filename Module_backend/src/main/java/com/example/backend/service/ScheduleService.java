package com.example.backend.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.DTO.ScheduleDTO;
import com.example.backend.entity.Schedule;

public interface ScheduleService  {

	List<ScheduleDTO> getAll();
	
	ScheduleDTO getByID(Long id);
	
	ScheduleDTO create(ScheduleDTO timeLineDTO);
	
	ScheduleDTO delete(Long id);
	
	ScheduleDTO update(Long id, ScheduleDTO timeLineDTO);

//	TimeLineDTO update(long id, TimeLineDTO timeLineDTO);
}
