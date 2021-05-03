package com.ssafy.eurekka.repository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.ssafy.eurekka.vo.User;


public interface UserRepository extends MongoRepository<User, ObjectId> {

    User findByEmail(String email);
}
