package com.example.backend.DTO;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResourcesDTO {
	private Long id;
	private String type;
	private byte[] Data;
	private Date createAt;  
	private String createBy; // neu la user thi se la email , học sinh sẽ là id
//	private Long chatID; 
}
