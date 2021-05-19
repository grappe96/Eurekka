package com.ssafy.eurekka.controller;

import com.ssafy.eurekka.service.BarcodeService;
import com.ssafy.eurekka.vo.Barcode;
import io.swagger.annotations.ApiOperation;
import java.util.StringTokenizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/barcode")
public class BarcodeController {

  @Autowired
  private BarcodeService barcodeService;

  @ApiOperation(value = "바코드정보조회", notes = "바코드 번호를 받아 해당 제품의 정보를 반환")
  @GetMapping()
  public ResponseEntity<?> findBarcode(@RequestParam("code") String code) {
    StringTokenizer st = new StringTokenizer(code, "E");
    String str = st.nextToken();
    code = str.replace(".", "");
    Barcode result = barcodeService.findBarcode(Double.parseDouble(code));
    if (result == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(result, HttpStatus.OK);
  }
}
