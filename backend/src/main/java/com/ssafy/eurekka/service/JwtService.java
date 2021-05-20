package com.ssafy.eurekka.service;

public interface JwtService {

	public String create(String email);
	public String decode(String token);

	
}
