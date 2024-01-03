package com.example.backend.DTO;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDTO {
	private Long id;

	private String date;

	private Boolean status;

	private String timeStart;

	private String timeEnd;

	private String content;

	private String createDate;

	private String updateDate;

	private String createBy;

	private String updateBy;

	private Boolean isDelete;
}
