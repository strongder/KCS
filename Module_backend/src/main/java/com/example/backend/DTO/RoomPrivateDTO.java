package com.example.backend.DTO;

import java.util.Date;

import com.example.backend.entity.Student;
import com.example.backend.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomPrivateDTO {

	private Long id;

	private Long user1ID;

	private Long user2ID;

	private Date createDate;

	private Boolean status;

}
