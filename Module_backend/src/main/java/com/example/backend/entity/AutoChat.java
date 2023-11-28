package com.example.backend.entity;

import java.util.Date;

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
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "autochat")
@Entity
public class AutoChat {
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
	private Long id;
	
	@Column(name = "content")
	private String content;
	
	@Column(name = "IdParent")
	private Long IdParent;
	
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
