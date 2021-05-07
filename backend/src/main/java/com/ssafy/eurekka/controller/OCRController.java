package com.ssafy.eurekka.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.eurekka.service.OCRService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
@RequestMapping("/ocr")
public class OCRController {

	@Autowired
	private OCRService ocrService;

	@ApiOperation(value = "OCR 결과 가져오기", notes = "사진 정보를 받아 OCR기능을 활용해 유통기한 읽기")
	@PostMapping()
	public ResponseEntity<String> naverOCR(
			@RequestParam(value = "updatedFile", required = true) MultipartFile expirationDateImg) {

		String expirationDate = ocrService.findOCRResult(expirationDateImg);
		
		if (expirationDate == null || expirationDate.equals("FAIL"))
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		return new ResponseEntity<String>(expirationDate, HttpStatus.OK);
	}
}
