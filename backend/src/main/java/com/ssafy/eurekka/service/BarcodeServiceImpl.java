package com.ssafy.eurekka.service;

import com.ssafy.eurekka.repository.BarcodeRepository;
import com.ssafy.eurekka.vo.Barcode;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BarcodeServiceImpl implements BarcodeService{

  @Autowired
  private BarcodeRepository barcodeRepository;

  @Override
  public Barcode findBarcode(Double code) {
    Optional<Barcode> found = barcodeRepository.findByCode(code);
    if (found.isPresent()) {
      return found.get();
    }
    return null;
  }
}
