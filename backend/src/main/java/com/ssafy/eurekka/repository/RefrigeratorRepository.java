package com.ssafy.eurekka.repository;

import com.ssafy.eurekka.vo.Refrigerator;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RefrigeratorRepository extends MongoRepository<Refrigerator, ObjectId> {

}
