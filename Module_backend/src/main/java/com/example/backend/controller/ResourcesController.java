package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.example.backend.DTO.ResourcesDTO;
import com.example.backend.entity.Resources;
import com.example.backend.service.ResourcesService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import org.springframework.http.MediaType;
import org.springframework.core.io.ByteArrayResource;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/file")
public class ResourcesController {

	@Autowired
	private ResourcesService resourcesService;
	
	@GetMapping("")
	public ResponseEntity<?> GetAllFile() {
		return ResponseEntity.ok(this.resourcesService.getAllFile());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ResourcesDTO> FindByID(@PathVariable("id") Long ID){
		ResourcesDTO getFile = this.resourcesService.getFileByID(ID);
		return new ResponseEntity<>(getFile, HttpStatus.OK);
	}
	
	@PostMapping("/upload/{id}")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file, @PathVariable("id") Long id) {
		System.out.println(file.getOriginalFilename() + "file: ");
        return new ResponseEntity<>(this.resourcesService.UploadFile(file, id), HttpStatus.CREATED);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadImage(@PathVariable("id") Long id) {
        ResourcesDTO image = this.resourcesService.getFileByID(id);
        System.out.println(image.getType());
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(image.getType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getId() + "\"")
                .body(new ByteArrayResource(image.getData()));
    }
    
    public void test()
    
    {
    	
    }
}
