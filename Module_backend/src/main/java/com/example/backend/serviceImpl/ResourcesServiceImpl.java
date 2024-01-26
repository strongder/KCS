package com.example.backend.serviceImpl;

import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
//import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Service;

import com.example.backend.DTO.ResourcesDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.entity.Resources;
import com.example.backend.exception.NotFoundException;
import com.example.backend.repository.ResourcesRepository;
import com.example.backend.service.ResourcesService;
import com.example.backend.service.UserService;
import com.example.backend.utils.FileUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ResourcesServiceImpl implements ResourcesService{

	@Autowired
	private ResourcesRepository fileRepository;
	
	@Autowired
	private FileUtils fileUtils;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private UserService userService;
	
	@Override
	public List<ResourcesDTO> getAllFile() {
		List<Resources> listResource = this.fileRepository.findAll();
		List<ResourcesDTO> listResourcesDTO = listResource.stream().map((item) -> this.modelMapper.map(item, ResourcesDTO.class)).toList();
		return listResourcesDTO;
	}

	@Override
	public ResourcesDTO getFileByID(Long ID) {
		Resources resources = this.fileRepository.findById(ID).orElseThrow(() -> {
			throw new NotFoundException("Not found image with id = " + ID);
		});	
		return this.modelMapper.map(resources, ResourcesDTO.class);
	}

	@Override
	public Resources UploadFile(MultipartFile newFile, Long id) {
		fileUtils.validateFile(newFile);
        try {   
//            String fileName = StringUtils.cleanPath(newFile.getOriginalFilename());
        	UserDTO user = this.userService.getByID(id);
            ResourcesDTO File = new ResourcesDTO();
            File.setCreateAt(new Date());
            File.setCreateBy(user.getEmail());
            File.setData(newFile.getBytes());
            File.setType(newFile.getContentType());
            Resources resources = this.modelMapper.map(File,Resources.class);
            Resources resources2 = this.fileRepository.save(resources);
            return resources2;
        } catch (Exception e) {
            throw new RuntimeException("Upload image error");
        }
		
	}

	public ResourcesDTO getFileByCreateBy(String createBy) {
		Resources resources = this.fileRepository.getByCreateBy(createBy).orElseThrow(() -> {
			throw new NotFoundException("Not found image with createBy = " + createBy);
		});	
		return this.modelMapper.map(resources, ResourcesDTO.class);
	}
	
}
