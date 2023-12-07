package com.example.backend.config.mapper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;

import org.modelmapper.AbstractConverter;

import com.example.backend.entity.Role;
import com.example.backend.exception.UserException;

public class StringToDateConverter extends AbstractConverter<String, Date>{

	@Override
	protected Date convert(String source) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date;
		try {
			date = sdf.parse(source);
			return date;
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new UserException("Không thể thêm do định dạng ngày không hợp lệ");
		}
	}

}
