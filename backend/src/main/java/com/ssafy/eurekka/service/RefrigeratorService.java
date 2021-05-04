package com.ssafy.eurekka.service;

import com.ssafy.eurekka.vo.Product;
import com.ssafy.eurekka.vo.Refrigerator;
import java.util.List;
import org.bson.types.ObjectId;

public interface RefrigeratorService {

  Refrigerator createProduct(ObjectId id, int category, Product product);
  List[] findAllProduct(ObjectId id);
  List<Product> findByCategory(ObjectId id, int category);
  void updateAbandon(String email, int category, Product product);
  void updateEat(String email, int category, Product product);
}
