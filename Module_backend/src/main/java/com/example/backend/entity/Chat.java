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
@Table(name = "chat")
@Entity
public class Chat {
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
	private Long id;
	
	@Column(name = "timeSend")
	private Date timeSend;
	
	@Column(name = "IDSender")
	private String IDSender; //nếu người gửi là giảng viên thì IDSender = email, nếu là sinh viên thì IDSender = ID sinh viên
	
	@Column(name = "type")
	private Boolean type; //nếu là 1 là tin nhắn bình thường, nếu là 0 thì là tin nhắn trả lời tự động
	
	@Column(name = "content")
	private String content;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "IDResources", referencedColumnName = "id")
	private Resources IDResources;
	
	@ManyToOne
	@JoinColumn(name = "roomID")
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private Room roomID;
}

