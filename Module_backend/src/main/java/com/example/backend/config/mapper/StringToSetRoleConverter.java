package com.example.backend.config.mapper;

import java.util.Set;

import org.modelmapper.AbstractConverter;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.backend.entity.Role;
import com.example.backend.exception.RoleException;
import com.example.backend.repository.RoleRepository;

public class StringToSetRoleConverter extends AbstractConverter<String, Role>{

	@Autowired
	private RoleRepository roleRepository;
	
	@Override
	protected Role convert(String source) {
		// TODO Auto-generated method stub
		Role role = this.roleRepository.findByName(source);
		if(role != null) {
			return role;
		} else {
			throw new RoleException("Loi phan quyen");
		}
	}

	
	
	

}