package com.example.backend.serviceImpl;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.DTO.ScheduleDTO;
import com.example.backend.entity.Schedule;
import com.example.backend.exception.ScheduleException;
import com.example.backend.repository.ScheduleRepository;
import com.example.backend.service.ScheduleService;

@Service
public class ScheduleServiceImpl implements ScheduleService {

	@Autowired
	private ScheduleRepository timeLineRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<ScheduleDTO> getAll() {
		// TODO Auto-generated method stub
		List<Schedule> listTimeLine = this.timeLineRepository.findAll();
		List<ScheduleDTO> list = listTimeLine.stream().map(timeline -> modelMapper.map(timeline, ScheduleDTO.class))
				.toList();
		return list;
	}

	@Override
	public ScheduleDTO create(ScheduleDTO timeLineDTO) {
		// TODO Auto-generated method stub
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			Date dateTest = sdf.parse(timeLineDTO.getDate());
//			System.out.println(dateTest);
			Schedule timeLine = this.timeLineRepository.findByDate(dateTest);
			if (timeLine == null) {
				Date date = new Date();
				try {
					Schedule saveSchedule = new Schedule();
					saveSchedule.setContent(timeLineDTO.getContent());
					saveSchedule.setCreateBy(timeLineDTO.getCreateBy());
					saveSchedule.setDate(sdf.parse(timeLineDTO.getDate()));
					saveSchedule.setIsDelete(false);
					saveSchedule.setStatus(timeLineDTO.getStatus());
					saveSchedule.setUpdateBy(timeLineDTO.getUpdateBy());
					saveSchedule.setTimeStart(sdf.parse(timeLineDTO.getTimeStart()));
					saveSchedule.setTimeEnd(sdf.parse(timeLineDTO.getTimeEnd()));
					saveSchedule.setCreateDate(date);
					saveSchedule.setUpdateDate(date);
					this.timeLineRepository.save(saveSchedule);
					System.out.println(saveSchedule);
					return timeLineDTO;
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					throw new ScheduleException("Lịch làm việc mới không đúng định dạng");
				}
			} else {
				throw new ScheduleException("Lịch làm việc đã tồn tại");
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			throw new ScheduleException("khong dung dinh dang");
		}
	}

	@Override
	public ScheduleDTO delete(Long id) {
		// TODO Auto-generated method stub
		Optional<Schedule> timeLine = this.timeLineRepository.findById(id);
		if (timeLine.get() != null) {
			Date date = new Date();
			timeLine.get().setIsDelete(true);
			timeLine.get().setUpdateDate(date);
			ScheduleDTO timeLineDTO = modelMapper.map(timeLine, ScheduleDTO.class);
			this.timeLineRepository.save(timeLine.get());
			return timeLineDTO;
		} else {
			throw new ScheduleException("Lịch làm việc không tồn tại");
		}
	}

	@Override
	public ScheduleDTO update(Long id, ScheduleDTO timeLineDTO) {
		// TODO Auto-generated method stub
		Optional<Schedule> timeLine = this.timeLineRepository.findById(id);
		if (timeLine.get() != null) {
			Date date = new Date();
			if (timeLine.get().getDate().before(date)) {
				throw new ScheduleException("Không thể sửa lịch làm việc đã qua");
			} else {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				timeLine.get().setStatus(timeLineDTO.getStatus());
				timeLine.get().setUpdateDate(date);
				try {
					timeLine.get().setContent(timeLineDTO.getContent());
					timeLine.get().setStatus(timeLineDTO.getStatus());
					timeLine.get().setTimeStart(sdf.parse(timeLineDTO.getTimeStart()));
					timeLine.get().setTimeEnd(sdf.parse(timeLineDTO.getTimeEnd()));
					this.timeLineRepository.save(timeLine.get());
					return timeLineDTO;
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					throw new ScheduleException("Lịch làm việc mới không đúng định dạng");
				}
			}
		} else {
			throw new ScheduleException("Lịch làm việc không tồn tại");
		}
	}

	@Override
	public ScheduleDTO getByID(Long id) {
		// TODO Auto-generated method stub
		Optional<Schedule> schedule = this.timeLineRepository.findById(id);
		if(schedule.isPresent()) {
			ScheduleDTO scheduleDTO = this.modelMapper.map(schedule, ScheduleDTO.class);
			return scheduleDTO;
		} else {
			throw new ScheduleException("Không tìm thấy lịch làm việc");
		}
	}

}
