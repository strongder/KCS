package com.example.backend.DTO;

import java.util.Collection;
import java.util.Date;

import com.example.backend.entity.Chat;
import com.example.backend.entity.Student;
import com.example.backend.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomDTO {
	private Long id;
	
	private User userID;
	
	private Student studentID;
	
	private Date createDate;
	
	private Boolean status;
}
