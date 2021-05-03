package com.ssafy.eurekka.controller;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.eurekka.service.JwtService;
import com.ssafy.eurekka.service.UserService;
import com.ssafy.eurekka.vo.User;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.ApiOperation;

import javax.servlet.http.HttpServletRequest;

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
	public ResponseEntity<Map<String, Object>> kakaoLogin(@RequestBody @ApiParam(value ="카카오에서 받은 access_token으로 회원정보 가져와 회원가입 및 로그인", required = true)String token){
		logger.info("kakaoLogin - 호출");

//		ObjectMapper mapper = new ObjectMapper();
//		JsonNode jsonNode;
//		jsonNode = mapper.readTree(token);
//		jsonNode.findValue("token");
//		System.out.println(jsonNode.findValue("token"));
		System.out.println("토큰:"+token);

		// access_token으로 회원정보 가져오기
		userService.kakaoLogin(token);

		return new ResponseEntity<Map<String, Object>>(HttpStatus.OK);
	}


//	@ApiOperation(value = "네이버 로그인 및 프로필 가져오기", notes = "state 리턴", response = String.class)
//	@GetMapping("/kakao/login")
//	public ResponseEntity<Object> naverLogin(String code, String state) {
//		// grant_type=authorization_code 고정!
//		ResponseEntity<Object> result = null;
//
//		// 상태코드 검증 해야하는데
//
//		String clientId = "AxHLlIRdNj8xtwynt8hJ";
//		String clientSecret = "d3QPfCSvIx";
//
//		// 인증코드(code)사용하여 접근토큰 발급받기
//		String url = "https://nid.naver.com/oauth2.0/token?client_id=" + clientId + "&client_secret=" + clientSecret
//				+ "&grant_type=authorization_code&state=" + state + "&code=" + code;
//		RestTemplate restTemplate = new RestTemplate();
//		HttpHeaders headers = new HttpHeaders();
//		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//		ResponseEntity<String> tokenResponse = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers),
//				String.class);
//		ObjectMapper objectMapper = new ObjectMapper();
//		OAuthToken oauthToken = null;
//		try {
//			oauthToken = objectMapper.readValue(tokenResponse.getBody(), OAuthToken.class);
//		} catch (JsonMappingException e) {
//			e.printStackTrace();
//		} catch (JsonProcessingException e) {
//			e.printStackTrace();
//		}
//		
//		// 접근토큰을(OAuthToken.access_token)사용하여 사용자 프로필정보 접근
//		restTemplate = new RestTemplate();
//		headers = new HttpHeaders();
//		headers.add("Authorization", "Bearer " + oauthToken.getAccess_token());
//
//		return result;
//	}

	// 회원정보 조회
	@ApiOperation(value = "회원정보 조회", notes = "header에 jwt를 보내주면 회원정보 리턴", response= User.class)
	@GetMapping("info")
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
	@ApiOperation(value = "회원정보 수정", notes = "변경할 name, profileImg를 parameter로 받아 회원정보 수정", response= User.class)
	@PutMapping("info")
	public ResponseEntity<String> updateUserInfo(@RequestBody @ApiParam(value = "변경할 회원정보가 포함된 User Dto", required = true)User user, HttpServletRequest req){
		logger.info("updateUserInfo - 호출");

		// 헤더의 jwt를 복호화하여 email 가져오기
		String jwt = req.getHeader("jwt");
		String email = jwtService.decode(jwt);

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
	@DeleteMapping("info")
	public ResponseEntity<String> deleteUserInfo(HttpServletRequest req){
		logger.info("deleteUserInfo - 호출");

		// 헤더의 jwt를 복호화하여 email 가져오기
		String jwt = req.getHeader("jwt");
		String email = jwtService.decode(jwt);

		// 정상적이지 않은 토큰이라면 401 Error 리턴
		if(email==null || email.isEmpty()){
			return new ResponseEntity<String>("FAIL", HttpStatus.UNAUTHORIZED);
		}

		// 회원정보 삭제 반영
		if(!userService.deleteUserInfo(email)){
			return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}
}
