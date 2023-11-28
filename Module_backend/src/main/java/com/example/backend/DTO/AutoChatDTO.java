package com.example.backend.DTO;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AutoChatDTO {

	private Long id;

	private String content;

	private Long IdParent;

	private Date createDate;

	private Date updateDate;

	private String createBy;

	private String updateBy;

	private Boolean isDelete;
}
