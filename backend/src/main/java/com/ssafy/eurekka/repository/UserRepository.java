package com.ssafy.eurekka.repository;

import com.ssafy.eurekka.vo.Barcode;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.ssafy.eurekka.vo.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, ObjectId> {

    User findByEmail(String email);
}
