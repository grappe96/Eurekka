package com.ssafy.eurekka.vo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ssafy.eurekka.util.CustomObjectIdSerializer;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Refrigerator {

  @JsonSerialize(using = CustomObjectIdSerializer.class)
  @Id
  private ObjectId id;

  // List<ObjectId>가 아닌 List<Product>로 한 이유:
  // 전체 제품 조회 할 때  List[]로 반환해서 ObjectId로 하면
  // 프론트에서 어떤 제품인지 알 수 없음
  List<Product> noodles;
  List<Product> snack;
  List<Product> beverage;
  List<Product> pickles;
  List<Product> diary;
  List<Product> health;
  List<Product> powder;
  List<Product> meat;
  List<Product> seasoning;
  List<Product> ocean;
  List<Product> fresh;
  List<Product> alcohol;
  List<Product> frozen;
  List<Product> ices;
  List<Product> others;
}
