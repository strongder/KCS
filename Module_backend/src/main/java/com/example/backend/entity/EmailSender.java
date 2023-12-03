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
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "emailSender")
@Entity
public class EmailSender {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
	private Long id;
	
	@Column(name = "verification")
	private Long verification;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "createDate")
	private Date createDate;
	
	@Column(name = "isDelete")
	private Boolean isDelete;
}
