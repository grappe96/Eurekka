package com.ssafy.eurekka.service;

import com.ssafy.eurekka.vo.Barcode;

public interface BarcodeService {

  Barcode findBarcode(String code);
}
