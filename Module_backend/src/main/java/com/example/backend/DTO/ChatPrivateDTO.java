package com.example.backend.DTO;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatPrivateDTO {
	private Long id;

	private Date timeSend;

	private Long IDSender;
	
	private Boolean type;

	private String content;

	private Long IDResources;

	private Long roomPrivateID;
}
