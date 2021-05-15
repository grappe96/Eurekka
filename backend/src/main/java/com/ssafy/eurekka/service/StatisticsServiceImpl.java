package com.ssafy.eurekka.service;


import com.ssafy.eurekka.repository.RefrigeratorRepository;
import com.ssafy.eurekka.repository.UserRepository;
import com.ssafy.eurekka.vo.DoneProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class StatisticsServiceImpl implements StatisticsService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefrigeratorRepository refrigeratorRepository;

    // 현재 월 음식 소비량
    @Override
    public Map<String, Integer> findCurrentMonthStatistics(String email) {
        List<DoneProduct> eatenProductList = userRepository.findByEmail(email).getEaten();
        List<DoneProduct> abandonedProductList = userRepository.findByEmail(email).getAbandoned();
        Calendar cal = Calendar.getInstance();
        int curMonth = cal.get(Calendar.MONTH)+1;
        int eatenCnt = 0;
        int abandonedCnt = 0;

        if(eatenProductList!=null){
            for(int i=0;i<eatenProductList.size();i++){
                if(eatenProductList.get(i).getRecordDate().getMonth()+1==curMonth)eatenCnt++;
            }
        }

        if(abandonedProductList!=null){
            for(int i=0;i<abandonedProductList.size();i++){
                if(abandonedProductList.get(i).getRecordDate().getMonth()+1==curMonth)abandonedCnt++;
            }
        }

        int totalCnt = eatenCnt + abandonedCnt;
        int eatenPercentage = eatenCnt*100/totalCnt;
        int abandonedPercentage = 100-eatenPercentage;
        Map<String, Integer> map = new HashMap<>();
        map.put("curMonth", curMonth);
        map.put("eatenCnt", eatenCnt);
        map.put("eatenPercentage", eatenPercentage);
        map.put("abandonedCnt", abandonedCnt);
        map.put("abandonedPercentage", abandonedPercentage);
        return map;
    }

    // 월별 버린 음식 개수
    @Override
    public Map<Integer, Integer> findMonthlyStatistics(String email) {
        List<DoneProduct> abandonedProductList = userRepository.findByEmail(email).getAbandoned();

        Map<Integer,Integer> map = new HashMap<>();
        for(int i=1;i<=12;i++){
            map.put(i,0);
        }
        if(abandonedProductList!=null){
            for(int i=0;i<abandonedProductList.size();i++){
                int month = abandonedProductList.get(i).getRecordDate().getMonth()+1;
                map.put(month, map.get(month)+1);
            }
        }
        return map;
    }

    // 카테고리별 소비량
    @Override
    public Map<String, int[]> findCategoryStatistics(String email) {
        List<DoneProduct> eatenProductList = userRepository.findByEmail(email).getEaten();
        List<DoneProduct> abandonedProductList = userRepository.findByEmail(email).getAbandoned();

        String category[] = {"면류", "제과제빵류", "음료", "절임류", "유제품", "건강식품", "분말류", "육류", "양념류", "수산물", "과채류", "주류", "냉동식품", "빙과류", "기타"};
        Map<String, int[]> map = new HashMap<>();
        for(int i=0;i<=14;i++){
            map.put(category[i], new int[] {0,0});
        }

        if(eatenProductList!=null){
            for(int i=0;i<eatenProductList.size();i++){
                String cg = category[eatenProductList.get(i).getCategory()];
                map.put(cg, new int[] {map.get(cg)[0]+1 ,map.get(cg)[1]});
            }
        }
        if(abandonedProductList!=null){
            for(int i=0;i<abandonedProductList.size();i++){
                String cg = category[abandonedProductList.get(i).getCategory()];
                map.put(cg, new int[] {map.get(cg)[0] ,map.get(cg)[1]+1});
            }
        }
        return map;
    }
}
