package com.example.backend.entity;

import java.util.Collection;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.EqualsAndHashCode.Exclude;
import lombok.NoArgsConstructor;

@Entity
@Table (name="roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
	private Long Id;
	
	@Column(name="name")
	private String name;
	
	@OneToMany(mappedBy = "role")
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private Collection<User> listUser;
}
