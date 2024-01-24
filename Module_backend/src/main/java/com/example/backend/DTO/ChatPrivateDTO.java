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

	private String IdSender;

	private String content;

	private String IDResources;

	private Long roomPrivateID;
}
