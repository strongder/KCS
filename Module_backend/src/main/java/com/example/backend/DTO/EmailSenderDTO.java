package com.example.backend.DTO;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmailSenderDTO {

	private Long id;
	
	private Long verification;
	
	private String email;
	
	private Date createDate;
	
	private Boolean isDelete;
	
}
