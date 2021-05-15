package com.ssafy.eurekka.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import com.ssafy.eurekka.repository.RefrigeratorRepository;
import com.ssafy.eurekka.repository.UserRepository;
import com.ssafy.eurekka.vo.KakaoUserInfo;
import com.ssafy.eurekka.vo.Product;
import com.ssafy.eurekka.vo.Refrigerator;
import com.ssafy.eurekka.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefrigeratorRepository refrigeratorRepository;

    // 카카오 로그인
    @Override
    public User kakaoLogin(String access_token, String deviceToken) {

        // 카카오 서버에 회원정보 요청
        RestTemplate rt = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + access_token);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);
        ResponseEntity<String> response = rt.exchange("https://kapi.kakao.com/v2/user/me", HttpMethod.POST,
                kakaoProfileRequest, String.class);
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoUserInfo kakaoUserInfo = null;
        User user = null;
        try {
            kakaoUserInfo = objectMapper.readValue(response.getBody(), KakaoUserInfo.class);

            user = userRepository.findByEmail(kakaoUserInfo.kakao_account.email);

            // 회원가입
            if(user==null){
                user = new User();

                // 카테고리별로 리스트 생성된 Refrigerator 객체 생성하여 User의 refrigeratorId에 넣어주기
                Refrigerator refrigerator = new Refrigerator();
                refrigerator.setNoodles(new ArrayList<Product>());
                refrigerator.setSnack(new ArrayList<Product>());
                refrigerator.setBeverage(new ArrayList<Product>());
                refrigerator.setPickles(new ArrayList<Product>());
                refrigerator.setDiary(new ArrayList<Product>());
                refrigerator.setHealth(new ArrayList<Product>());
                refrigerator.setPowder(new ArrayList<Product>());
                refrigerator.setMeat(new ArrayList<Product>());
                refrigerator.setSeasoning(new ArrayList<Product>());
                refrigerator.setOcean(new ArrayList<Product>());
                refrigerator.setFresh(new ArrayList<Product>());
                refrigerator.setAlcohol(new ArrayList<Product>());
                refrigerator.setFrozen(new ArrayList<Product>());
                refrigerator.setIces(new ArrayList<Product>());
                refrigerator.setOthers(new ArrayList<Product>());
                refrigeratorRepository.save(refrigerator);

                // 회원 등록
                user.setName(kakaoUserInfo.properties.nickname);
                user.setEmail(kakaoUserInfo.kakao_account.email);
                user.setProfileImg("img1");
                user.setRefrigeratorId(refrigerator.getId());
                user.setAlarmCycle(1);
                user.setDeviceToken(deviceToken);
            }else{
                // 기존회원 deviceToken 넣기
                user.setDeviceToken(deviceToken);
            }
            // 회원가입, 기존회원 모두 deviceToken 재반영
            userRepository.save(user);

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return user;
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

        // 기존 회원정보 객체에 수정할 내용(name, profileImg, alarmCycle) 반영하기
        updatedUser.setName(user.getName());
        updatedUser.setProfileImg(user.getProfileImg());
        updatedUser.setAlarmCycle(user.getAlarmCycle());

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
        userRepository.deleteById(user.getId());
        refrigeratorRepository.deleteById(user.getRefrigeratorId());
        return true;
    }
}
