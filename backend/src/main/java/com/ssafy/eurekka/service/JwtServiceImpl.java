package com.ssafy.eurekka.service;

import static com.auth0.jwt.JWT.require;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.ssafy.eurekka.controller.UserController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class JwtServiceImpl implements JwtService {

  private static final Logger logger = LoggerFactory.getLogger(UserController.class);

  // encode
  @Value("${JWT.ISSUER}")
  private String ISSUER;

  @Value("${JWT.SECRET}")
  private String SECRET;

  /**
   * 토큰 생성
   *
   * @email email : 토큰에 담길 로그인한 사용자의 email
   * @return token : jwt 토큰
   */

  // encode
  public String create(String email) {
    try {
      JWTCreator.Builder b = JWT.create();
      // 토큰 발급자
      b.withIssuer(ISSUER);
      // 토큰 payload 작성, key - value 형식, 객체도 가능
      b.withClaim("email", email);
      return b.sign(Algorithm.HMAC256(SECRET));
    } catch (JWTCreationException jwtCreationException) {
      logger.info(jwtCreationException.getLocalizedMessage());
    }
    return null;
  }

  // encode
  public static class TokenRes {
    private String token;
    public TokenRes() {
    }
    public TokenRes(String token) {
      this.token = token;
    }
    public String getToken() {
      return token;
    }
    public void setToken(String token) {
      this.token = token;
    }
  }

  // decode
  public String decode(String token) {
    String email = null;
    try {
      // 토큰 해독 객체 생성
      final JWTVerifier jwtVerifier = require(Algorithm.HMAC256(SECRET)).withIssuer(ISSUER).build();
      // 토큰 검증
      DecodedJWT decodedJWT = jwtVerifier.verify(token);
      // 토큰 payload(email) 반환, 정상적인 토큰이라면 토큰 사용자 고유 email, 아니라면 null
      email = decodedJWT.getClaim("email").toString();
      email = email.substring(1,email.length()-1);
    } catch (JWTVerificationException jve) {
      log.error(jve.getMessage());
    }
    return email;
  }
}