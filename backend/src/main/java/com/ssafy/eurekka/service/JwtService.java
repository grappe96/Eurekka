package com.ssafy.eurekka.service;

import java.util.Map;



public interface JwtService {

	public String create(String email);
	public String decode(String token);

	
}
