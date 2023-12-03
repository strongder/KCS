package com.example.backend.entity;

import java.util.Date;

import org.hibernate.annotations.DialectOverride.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "schedule")
@Entity
public class Schedule {
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
	private Long id;
	
	@Column(name = "date")
	private Date date;
	
	@Column(name = "status")
	private Boolean status;
	
	@Column(name = "timeStart")
	private Date timeStart;
	
	@Column(name = "timeEnd")
	private Date timeEnd;
	
	@Column(name = "content")
	private String content;
	
	@Column(name = "createDate")
	private Date createDate;
	
	@Column(name = "updateDate")
	private Date updateDate;
	
	@Column(name = "createBy")
	private String createBy;
	
	@Column(name = "updateBy")
	private String updateBy;
	
	@Column(name = "isDelete")
	private Boolean isDelete;
}
