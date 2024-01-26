package com.example.backend.DTO;

import java.util.Date;

import com.example.backend.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

	private Long id;
	
	private String name;
	
	private String email;
	
	private String password;
	
	private String phone;
	
	private String birthDay;
	
	private String MaTK;
	
	private byte[] avt;
	
	private String role;
	
	private String createDate;
	
	private String updateDate;
	
	private String createBy;
	
	private String updateBy;
	
	private Boolean gender;
	
	private Boolean status;
	
	private Boolean isDelete;
}
