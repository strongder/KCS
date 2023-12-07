package com.example.backend.entity;

import java.util.Collection;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
@Entity
public class User {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "id")
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "email")
	private String email;

	@Column(name = "password")
	private String password;

	@Column(name = "phone")
	private String phone;

	@Column(name = "ma_TK")
	private String MaTK;

	@Column(name = "avt")
	private String avt;

	@Temporal(TemporalType.DATE)
	@Column(name = "birthDay")
	private Date birthDay;
	
	@ManyToOne
	@JoinColumn(name = "RoleID", referencedColumnName = "id")
	private Role role;

	@Column(name = "createDate")
	private Date createDate;

	@Column(name = "updateDate")
	private Date updateDate;

	@Column(name = "createBy")
	private String createBy;

	@Column(name = "updateBy")
	private String updateBy;

	@Column(name = "Gender")
	private Boolean gender;

	@Column(name = "status")
	private Boolean status;

	@Column(name = "isDelete")
	private Boolean isDelete;

	@OneToMany(mappedBy = "userID", cascade = CascadeType.ALL)
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private Collection<Room> listRooms;
}
