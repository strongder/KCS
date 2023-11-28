package com.example.backend.DTO;

import java.util.Date;

import com.example.backend.entity.Resources;
import com.example.backend.entity.Room;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatDTO {

	private Long id;

	private Date timeSend;

	private String IDSender;
	
	private Boolean type;

	private String content;

	private Long IDResources;

	private Long roomID;
}
