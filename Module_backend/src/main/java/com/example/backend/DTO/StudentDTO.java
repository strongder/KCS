package com.example.backend.DTO;

import java.util.Collection;
import java.util.Date;

import com.example.backend.entity.Room;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class StudentDTO {
	private Long id;

	private String name;

	private Date createRegister;

	private Boolean isDelete;

}
