package com.ssafy.eurekka.repository;

import com.ssafy.eurekka.vo.Product;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, ObjectId> {

}
