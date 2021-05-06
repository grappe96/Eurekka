package com.ssafy.eurekka.controller;

import com.ssafy.eurekka.service.JwtService;
import com.ssafy.eurekka.service.StatisticsService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/statistics")
public class StatisticsController {

    private static final Logger logger = LoggerFactory.getLogger(StatisticsController.class);

    @Autowired
    private JwtService jwtService;

    @Autowired
    private StatisticsService statisticsService;

    @ApiOperation(value="현재 월 음식 소비량", notes = "jwt를 받아서 현재 월의 음식 소비량 리턴")
    @GetMapping("/curmonth")
    public ResponseEntity<Map<String, Integer>> findCurrentMonthStatistics(HttpServletRequest req){
        logger.info("findCurrentMonthStatistics - 호출");

        // 헤더의 jwt를 복호화하여 email 가져오기
        String jwt = req.getHeader("jwt");
        String email = jwtService.decode(jwt);

        // 정상적이지 않은 토큰이라면 401 Error 리턴
        if(email==null || email.isEmpty()){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // 현재 월의 먹은 양, 버린 양 가져오기
        Map<String, Integer> map = statisticsService.findCurrentMonthStatistics(email);
        return new ResponseEntity<Map<String, Integer>>(map, HttpStatus.OK);
    }


    @ApiOperation(value="월별 버린 음식 개수", notes = "jwt를 받아서 월별 버린 음식개수 리턴")
    @GetMapping("/monthly")
    public ResponseEntity<Map<Integer, Integer>> findMonthlyStatistics(HttpServletRequest req){
        logger.info("findMonthlyStatistics - 호출");

        // 헤더의 jwt를 복호화하여 email 가져오기
        String jwt = req.getHeader("jwt");
        String email = jwtService.decode(jwt);

        // 정상적이지 않은 토큰이라면 401 Error 리턴
        if(email==null || email.isEmpty()){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // 월별 버린 음식 개수 가져오기
        Map<Integer, Integer> map = statisticsService.findMonthlyStatistics(email);
        return new ResponseEntity<Map<Integer, Integer>>(map, HttpStatus.OK);
    }


    @ApiOperation(value="카테고리별 소비량", notes = "jwt를 받아서 카테고리별 소비량 리턴")
    @GetMapping("/category")
    public ResponseEntity<Map<String, int[]>> findCategoryStatistics(HttpServletRequest req){
        logger.info("findCategoryStatistics - 호출");

        // 헤더의 jwt를 복호화하여 email 가져오기
        String jwt = req.getHeader("jwt");
        String email = jwtService.decode(jwt);

        // 정상적이지 않은 토큰이라면 401 Error 리턴
        if(email==null || email.isEmpty()){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // 카테고리별 소비량 가져오기
        Map<String, int[]> map = statisticsService.findCategoryStatistics(email);
        return new ResponseEntity<Map<String, int[]>>(map, HttpStatus.OK);
    }
}
