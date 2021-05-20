package com.ssafy.eurekka.service;

import org.springframework.web.multipart.MultipartFile;

public interface OCRService {

	String findOCRResult(MultipartFile expirationDateImg);
   
}
