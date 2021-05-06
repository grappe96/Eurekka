package com.ssafy.eurekka.service;

import com.ssafy.eurekka.vo.Product;
import com.ssafy.eurekka.vo.Refrigerator;
import java.util.Map;
import org.bson.types.ObjectId;

public interface RefrigeratorService {

  Refrigerator createProduct(ObjectId id, Product product);
  Map<Product, Integer> findAllProduct(ObjectId id);
  Map<Product, Integer> findByCategory(ObjectId id, int category);
  void updateAbandon(String email, Product product);
  void updateEat(String email, Product product);
}
