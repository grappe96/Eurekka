package com.ssafy.eurekka.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.eurekka.repository.UserRepository;
import com.ssafy.eurekka.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    // 카카오 로그인
    @Override
    public void kakaoLogin(String access_token) {
        System.out.println("impl의 토큰:"+access_token);
        RestTemplate rt = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + access_token);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        ResponseEntity<String> response = rt.exchange("https://kapi.kakao.com/v2/user/me", HttpMethod.POST,
                kakaoProfileRequest, String.class);
        System.out.print(response.getBody());
        //ObjectMapper objectMapper = new ObjectMapper();
    }

    // 회원정보 조회
    @Override
    public User findUserInfo(String email) {
        return userRepository.findByEmail(email);
    }

    // 회원정보 수정
    @Override
    public boolean updateUserInfo(User user) {
        // 기존 회원정보 가져오기
        User updatedUser = userRepository.findByEmail(user.getEmail());

        // 없는 회원이라면 false 리턴
        if(updatedUser== null) return false;

        // 기존 회원정보 객체에 수정할 내용(name, profileImg) 반영하기
        updatedUser.setName(user.getName());
        updatedUser.setProfileImg(user.getProfileImg());

        // DB 업데이트
        userRepository.save(updatedUser);

        return true;
    }

    //회원정보 삭제
    @Override
    public boolean deleteUserInfo(String email) {
        // 회원정보 가져오기
        User user = userRepository.findByEmail(email);

        // 없는 회원이라면 false 리턴
        if(user== null) return false;

        // DB 에서 user 삭제
        userRepository.delete(user);
        return true;
    }




}
