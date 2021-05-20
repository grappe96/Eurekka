package com.ssafy.eurekka.controller;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.eurekka.service.JwtService;
import com.ssafy.eurekka.service.UserService;
import com.ssafy.eurekka.vo.User;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private JwtService jwtService;

	@Autowired
	private UserService userService;

	// 카카오 로그인
	@ApiOperation(value = "카카오 로그인 및 회원가입", notes = "회원 name, email을 포함한 객체를 보내고 jwt,email,name 리턴", response = Object.class)
	@PostMapping("/kakao/login")
	public ResponseEntity<Map<String, Object>> kakaoLogin(HttpServletRequest req,@RequestBody @ApiParam(value ="카카오에서 받은 access_token으로 회원정보 가져와 회원가입 및 로그인", required = true) String token){
		logger.info("kakaoLogin - 호출");
		String deviceToken = req.getHeader("deviceToken");
		token = token.substring(10,64);

		// access_token으로 회원정보 가져오기
		User user = userService.kakaoLogin(String.valueOf(token), deviceToken);

		if(user==null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		// jwt 토큰 발급
		String jwt = jwtService.create(user.getEmail());

		Map<String, Object> map = new HashMap<>();
		map.put("jwt", jwt);
		map.put("user", user);
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	// 회원정보 조회
	@ApiOperation(value = "회원정보 조회", notes = "header에 jwt를 보내주면 회원정보 리턴", response= User.class)
	@GetMapping("/info")
	public ResponseEntity<User> findUserInfo(HttpServletRequest req){
		logger.info("findUserInfo - 호출");

		// 헤더의 jwt를 복호화하여 email 가져오기
		String jwt = req.getHeader("jwt");
		String email = jwtService.decode(jwt);

		// 정상적이지 않은 토큰이라면 401 Error 리턴
		if(email==null || email.isEmpty()){
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		// 유저정보 가져오기
		User user = userService.findUserInfo(email);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	// 회원정보 수정
	@ApiOperation(value = "회원정보 수정", notes = "변경할 name, profileImg, alarmCycle을 객체 parameter로 받아 회원정보 수정", response= User.class)
	@PutMapping("/info")
	public ResponseEntity<String> updateUserInfo(@RequestBody @ApiParam(value = "변경할 회원정보가 포함된 User Dto", required = true)User user, HttpServletRequest req){
		logger.info("updateUserInfo - 호출");

		// 헤더의 jwt를 복호화하여 email 가져오기
		String jwt = req.getHeader("jwt");
		String email = jwtService.decode(jwt);
		user.setEmail(email);

		// 정상적이지 않은 토큰이라면 401 Error 리턴
		if(email==null || email.isEmpty()){
			return new ResponseEntity<>("FAIL", HttpStatus.UNAUTHORIZED);
		}

		// 회원정보 수정 반영
		if(!userService.updateUserInfo(user)){
			return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	}

	// 회원정보 삭제
	@ApiOperation(value = "회원정보 삭제", notes = "변경할 name, profileImg를 parameter로 받아 회원정보 수정", response= User.class)
	@DeleteMapping("/info")
	public ResponseEntity<String> deleteUserInfo(HttpServletRequest req){
		logger.info("deleteUserInfo - 호출");

		// 헤더의 jwt를 복호화하여 email 가져오기
		String jwt = req.getHeader("jwt");
		String email = jwtService.decode(jwt);

		// 정상적이지 않은 토큰이라면 401 Error 리턴
		if(email==null || email.isEmpty()){
			return new ResponseEntity<String>("FAIL", HttpStatus.UNAUTHORIZED);
		}

		// 회원정보, 유저냉장고 삭제 반영
		if(!userService.deleteUserInfo(email)){
			return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}
}
