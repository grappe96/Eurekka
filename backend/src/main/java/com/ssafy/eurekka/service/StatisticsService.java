package com.ssafy.eurekka.service;

import java.util.Map;

public interface StatisticsService {
    Map<String, Integer> findCurrentMonthStatistics(String email);
    Map<Integer, Integer> findMonthlyStatistics(String email);
    Map<String, int[]> findCategoryStatistics(String email);
}
