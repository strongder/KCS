package com.example.backend.config.mapper;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;

import com.example.backend.exception.ScheduleException;
import com.example.backend.exception.UserException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class StringToDateConverter extends AbstractConverter<String, Date> {
    @Override
    public Date convert(String source) {
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date;
		try {
			date = sdf.parse(source);
			return date;
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new UserException("Không thể thêm người dùng do ngày sinh không hợp lệ");
		}
    }
}