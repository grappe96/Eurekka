package com.ssafy.eurekka.repository;

import com.ssafy.eurekka.vo.Barcode;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BarcodeRepository extends MongoRepository<Barcode, ObjectId> {

  Optional<Barcode> findByCode(Double code);
}
