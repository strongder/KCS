package com.example.backend.serviceImpl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

//import org.apache.catalina.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.DTO.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.exception.UserException;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	
	@Override
	public List<UserDTO> getAll() {
		// TODO Auto-generated method stub
		List<User> listUser = this.userRepository.findAll();
		List<UserDTO> listUserDTO= listUser.stream().map(user -> modelMapper.map(user, UserDTO.class)).toList();
		return listUserDTO;
	}

	@Override
	public UserDTO getByID(Long id) {
		// TODO Auto-generated method stub
		Optional<User> user = this.userRepository.findById(id);
		if(user.get() != null) {
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
			User user = modelMapper.map(userDTO, User.class);
			user.setAvt("https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg");
			user.setCreateDate(date);
			user.setUpdateDate(date);
			user.setIsDelete(false);
			this.userRepository.save(user);
			return userDTO;
		} else {
			throw new UserException("Email hoặc SĐT đã tồn tại");
		}
	}

	@Override
	public UserDTO update(Long id, UserDTO userDTO) {
		// TODO Auto-generated method stub
		Optional<User> user = this.userRepository.findById(id);
		if(user.get() != null) {
			Optional<User> userCheckEmail = this.userRepository.findByEmail(userDTO.getEmail());
			Optional<User> userCheckPhone = this.userRepository.findByPhone(userDTO.getPhone());
			if(userCheckEmail.isEmpty() && userCheckPhone.isEmpty()) {
				Date date = new Date();
				User userSaved = this.modelMapper.map(userDTO, User.class);
				userSaved.setId(id);
				userSaved.setUpdateDate(date);
				this.userRepository.save(userSaved);
				return userDTO;
			} else if(userCheckEmail.isEmpty() && userCheckPhone.isPresent()) {
				if(userCheckPhone.get().getId() == id) {
					Date date = new Date();
					User userSaved = this.modelMapper.map(userDTO, User.class);
					userSaved.setId(id);
					userSaved.setUpdateDate(date);
					this.userRepository.save(userSaved);
					return userDTO;
				} else {
					throw new UserException("Số điện thoại đã tồn tại");
				}
			} else if(userCheckEmail.isPresent() && userCheckPhone.isEmpty()) {
				if(userCheckEmail.get().getId() == id) {
					Date date = new Date();
					User userSaved = this.modelMapper.map(userDTO, User.class);
					userSaved.setId(id);
					userSaved.setUpdateDate(date);
					this.userRepository.save(userSaved);
					return userDTO;
				} else {
					throw new UserException("Email đã tồn tại");
				}
			} else {
				if(userCheckEmail.get().getId() == id && userCheckPhone.get().getId() == id) {
					Date date = new Date();
					User userSaved = this.modelMapper.map(userDTO, User.class);
					userSaved.setId(id);
					userSaved.setUpdateDate(date);
					this.userRepository.save(userSaved);
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
		if(user.get() != null) {
			Date date = new Date();
			user.get().setIsDelete(true);
			user.get().setUpdateDate(date);
			UserDTO userDTO = this.modelMapper.map(user, UserDTO.class);
			return userDTO;
		} else {
			throw new UserException("Người dùng không tồn tại");
		}
	}

}
