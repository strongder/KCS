package com.example.backend.DTO;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimeLineDTO {
	private Long id;

	private Date date;

	private Boolean status;

	private Date timeStart;

	private Date timeEnd;

	private String content;

	private Date createDate;

	private Date updateDate;

	private String createBy;

	private String updateBy;

	private Boolean isDelete;
}
