package com.example.backend.serviceImpl;

import java.util.Date;

import java.util.List;
import java.util.Optional;
import java.util.Properties;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.messaging.Message;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.example.backend.DTO.EmailSenderDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.entity.EmailSender;
import com.example.backend.entity.User;
import com.example.backend.exception.EmailSenderException;
import com.example.backend.repository.EmailSenderRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.EmailSenderService;
import com.example.backend.service.UserService;

import jakarta.mail.Session;

import java.util.Properties;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.Properties;

@Service
public class EmailSenderServiceImpl implements EmailSenderService {

	@Autowired
	private EmailSenderRepository emailSenderRepository;

	@Autowired
	private JavaMailSender emailSender;

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Boolean getVerificationByEmail(String email) {
		// TODO Auto-generated method stub
		Optional<EmailSender> emailSender = this.emailSenderRepository.findByEmailUser(email);
		if (emailSender.isPresent()) {
			emailSender.get().setIsDelete(true);
			EmailSenderDTO emailSenderDTO = this.modelMapper.map(emailSender, EmailSenderDTO.class);
//			this.emailSenderRepository.save(emailSender.get());
			return true;
		} else {
			return false;
//			throw new EmailSenderException("Ma xac nhan khong chinh xac");
		}
	}

	@Override
	public EmailSenderDTO create(String email) {
		// TODO Auto-generated method stub
		Optional<User> user = this.userRepository.findByEmail(email);
		if (user.isPresent()) {
			while (true) {
				Long verification = Math.round(Math.random() * 100000 % (999999 - 100000) + 100000);
					Date date = new Date();
					EmailSender emailSender1 = new EmailSender();
					emailSender1.setEmail(email);
					emailSender1.setIsDelete(false);
					emailSender1.setVerification(verification);
					emailSender1.setCreateDate(date);
					this.emailSenderRepository.save(emailSender1);
					SimpleMailMessage message = new SimpleMailMessage();
					message.setTo(email);
					message.setSubject("Xác nhận thay đổi mật khẩu");
					message.setText("" + verification);
					emailSender.send(message);
					return this.modelMapper.map(emailSender1, EmailSenderDTO.class);
				}
		} else {
			throw new EmailSenderException("Email không tồn tại");
		}
	}

//	@Override
//	@Scheduled(fixedRate = 300000)
//	public void delete() {
//		// TODO Auto-generated method stub
//		List<EmailSender> listEmailSenders = this.emailSenderRepository.findByIsDeleteFalse();
//		Date date = new Date();
//		if (!listEmailSenders.isEmpty()) {
//			for (EmailSender e : listEmailSenders) {
//				if (date.getTime() - e.getCreateDate().getTime() >= 300000) {
//					e.setIsDelete(true);
//					this.emailSenderRepository.save(e);
//				}
//			}
//		}
//	}
}
