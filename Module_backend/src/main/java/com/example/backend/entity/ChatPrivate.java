package com.example.backend.entity;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "chat_private")
public class ChatPrivate {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
	private Long id;
	
	@Column(name = "timeSend")
	private Date timeSend;
	
	@Column(name = "IDSender")
	private Long IDSender;
	
	@Column(name = "content")
	private String content;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "IDResources", referencedColumnName = "id")
	private Resources IDResources;
	
	@ManyToOne
	@JoinColumn(name = "room_private_ID")
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private RoomPrivate roomPrivate;
	
}
