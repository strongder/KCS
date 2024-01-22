package com.example.backend.serviceImpl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.text.ParseException;
import org.modelmapper.ModelMapper;
import org.modelmapper.internal.bytebuddy.asm.Advice.This;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.DTO.RoomPrivateDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.entity.RoomPrivate;
import com.example.backend.entity.User;
import com.example.backend.exception.ScheduleException;
import com.example.backend.exception.UserException;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.RoomPrivateService;
import com.example.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private RoomPrivateService roomPrivateService;
	
	@Override
	public List<UserDTO> getAll() {
		// TODO Auto-generated method stub
		List<User> listUser = this.userRepository.findAll();
		List<UserDTO> listUserDTO = listUser.stream().map(user -> modelMapper.map(user, UserDTO.class)).toList();
		return listUserDTO;
	}

	@Override
	public UserDTO getByID(Long id) {
		// TODO Auto-generated method stub
		Optional<User> user = this.userRepository.findById(id);
		if (user.get() != null) {
			UserDTO userDTO = this.modelMapper.map(user, UserDTO.class);
			return userDTO;
		} else {
			throw new UserException("Khong the tim thay nguoi dung");
		}
	}

	@Override
	public UserDTO create(UserDTO userDTO) {
		// TODO Auto-generated method stub
		List<User> listUsers = this.userRepository.findByEmailOrPhone(userDTO.getEmail(), userDTO.getPhone());
		if (listUsers.isEmpty()) {

			Date date = new Date();
			Long avt = (long) 1;
			User user = modelMapper.map(userDTO, User.class);
//			user.setAvt(avt);
			user.setCreateDate(date);
			user.setUpdateDate(date);
			user.setIsDelete(false);
			user.setMaTK("GV" + date.getTime());
//			this.userRepository.save(user);
			User userSave = this.userRepository.save(user);
			this.createRoomPrivate(userSave);
			return userDTO;
		} else {
			throw new UserException("Email hoặc SĐT đã tồn tại");
		}
	}

	@Override
	public UserDTO update(Long id, UserDTO userDTO) {
		// TODO Auto-generated method stub
		Optional<User> user = this.userRepository.findById(id);
		if (user.get() != null) {
			Optional<User> userCheckEmail = this.userRepository.findByEmail(userDTO.getEmail());
			Optional<User> userCheckPhone = this.userRepository.findByPhone(userDTO.getPhone());
			if (userCheckEmail.isEmpty() && userCheckPhone.isEmpty()) {
				Date date = new Date();
				User userSaved = this.modelMapper.map(userDTO, User.class);
				userSaved.setId(id);
				userSaved.setUpdateDate(date);
				this.userRepository.save(userSaved);
				return userDTO;
			} else if (userCheckEmail.isEmpty() && userCheckPhone.isPresent()) {
				if (userCheckPhone.get().getId() == id) {
					Date date = new Date();
					User userSaved = this.modelMapper.map(userDTO, User.class);
					userSaved.setId(id);
					userSaved.setUpdateDate(date);
					this.userRepository.save(userSaved);
//					this.createRoomPrivate(userSave);
					return userDTO;
				} else {
					throw new UserException("Số điện thoại đã tồn tại");
				}
			} else if (userCheckEmail.isPresent() && userCheckPhone.isEmpty()) {
				if (userCheckEmail.get().getId() == id) {
					Date date = new Date();
					User userSaved = this.modelMapper.map(userDTO, User.class);
					userSaved.setId(id);
					userSaved.setUpdateDate(date);
					this.userRepository.save(userSaved);
//					this.createRoomPrivate(userSave);
					return userDTO;
				} else {
					throw new UserException("Email đã tồn tại");
				}
			} else {
				if (userCheckEmail.get().getId() == id && userCheckPhone.get().getId() == id) {
					Date date = new Date();
					User userSaved = this.modelMapper.map(userDTO, User.class);
					userSaved.setId(id);
					userSaved.setUpdateDate(date);
					this.userRepository.save(userSaved);
//					this.createRoomPrivate(userSave);
					return userDTO;
				} else {
					throw new UserException("Email hoặc số điện thoại đã tồn tại");
				}
			}
		} else {
			throw new UserException("Người dùng không tồn tại");
		}
	}

	@Override
	public UserDTO delete(Long id) {
		// TODO Auto-generated method stub
		Optional<User> user = this.userRepository.findById(id);
		if (user.get() != null) {
			Date date = new Date();
			user.get().setIsDelete(true);
			user.get().setUpdateDate(date);
			userRepository.save(user.get());
			UserDTO userDTO = this.modelMapper.map(user, UserDTO.class);
			return userDTO;
		} else {
			throw new UserException("Người dùng không tồn tại");
		}
	}

	@Override
	public UserDTO getByEmail(String email) {
		// TODO Auto-generated method stub
		Optional<User> user = this.userRepository.findByEmail(email);
		if (user.get() != null) {
			UserDTO userDTO = this.modelMapper.map(user, UserDTO.class);
			return userDTO;
		} else {
			throw new UserException("Khong the tim thay nguoi dung");
		}
	}

	public void createRoomPrivate(User user) {
		List<UserDTO> listUserDTO = this.getAll();
		if(listUserDTO.size() > 1) {
			List<User> listUser = listUserDTO.stream().map((item) -> this.modelMapper.map(item, User.class)).toList();
			Iterator ItrUser = listUser.iterator();
			while(ItrUser.hasNext()) {
				User user1 = (User) ItrUser.next();
//				User user2 = user1.
				RoomPrivateDTO roomPrivate = new RoomPrivateDTO();
				roomPrivate.setStatus(true);
				roomPrivate.setCreateDate(new Date());
				roomPrivate.setUser1ID(user.getId());
				roomPrivate.setUser2ID(user1.getId());
				this.roomPrivateService.create(roomPrivate);
			}
		}
	}
}
