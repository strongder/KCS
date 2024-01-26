package com.example.backend.config.mapper;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import java.lang.reflect.Type;
import java.time.ZoneId;

import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.convention.NamingConventions;
import org.modelmapper.spi.MatchingStrategy;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.NamingConventions;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.backend.DTO.ScheduleDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.entity.Schedule;
import com.example.backend.entity.User;

@Configuration
public class ModelMapperConfig {

	@Bean
	public StringToDateConverter stringToDateConverter() {
		return new StringToDateConverter();
	}
	@Bean
	public StringToSetRoleConverter stringToSetRoleConverter()
	{
		return new StringToSetRoleConverter();
	}
	
	@Bean
	public StringToDateConverter timeToStringConverter()
	{
		return new StringToDateConverter();
	}
	
    @Bean
    public ModelMapper modelMapper() {
       ModelMapper modelMapper = new ModelMapper();
       modelMapper.getConfiguration()
       .setSourceNamingConvention(NamingConventions.NONE)
       .setDestinationNamingConvention(NamingConventions.NONE);
       
       modelMapper.createTypeMap(User.class, UserDTO.class)
       	.addMapping(src -> src.getRole().getName(), UserDTO::setRole);
       
//       modelMapper.createTypeMap(Schedule.class, ScheduleDTO.class)
//       .addMappings(m -> m.using(timeToStringConverter()).map(Schedule::getCreateDate, ScheduleDTO::setCreateDate))
//       .addMappings(m -> m.using(timeToStringConverter()).map(Schedule::getUpdateDate, ScheduleDTO::setUpdateDate));
//       .addMapping(src -> src.getCreateDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(), ScheduleDTO::setCreateDate);
       	
       modelMapper.createTypeMap(UserDTO.class, User.class)
       	.addMappings(m -> m.using(stringToSetRoleConverter()).map(UserDTO::getRole, User::setRole))
       	.addMappings(m -> m.using(timeToStringConverter()).map(UserDTO::getBirthDay, User::setBirthDay));
       
       return modelMapper;
    }
}