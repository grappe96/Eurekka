package com.ssafy.eurekka.service;

import com.ssafy.eurekka.vo.User;

public interface UserService {
    User findUserInfo(String email);
    boolean updateUserInfo(User user);
    boolean deleteUserInfo(String email);
    User kakaoLogin(String access_token);
}
