package com.example.backend.config.mapper;



import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import java.lang.reflect.Type;
import org.modelmapper.convention.NamingConventions;
//import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.backend.DTO.UserDTO;
import com.example.backend.entity.User;



@Configuration
public class ModelMapperConfig {

	
	@Bean
	public StringToSetRoleConverter stringToSetRoleConverter()
	{
		return new StringToSetRoleConverter();
	}
	
    @Bean
    public ModelMapper modelMapper() {
       ModelMapper modelMapper = new ModelMapper();
       modelMapper.getConfiguration()
       .setSourceNamingConvention(NamingConventions.NONE)
       .setDestinationNamingConvention(NamingConventions.NONE);
       
       modelMapper.createTypeMap(User.class, UserDTO.class)
       	.addMapping(src -> src.getRole().getName(), UserDTO::setRole);
       
       modelMapper.createTypeMap(UserDTO.class, User.class)
       	.addMappings(m -> m.using(stringToSetRoleConverter()).map(UserDTO::getRole, User::setRole));
       return modelMapper;
    }
}
