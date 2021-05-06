package com.ssafy.eurekka.service;

import com.ssafy.eurekka.repository.ProductRepository;
import com.ssafy.eurekka.repository.RefrigeratorRepository;
import com.ssafy.eurekka.repository.UserRepository;
import com.ssafy.eurekka.vo.DoneProduct;
import com.ssafy.eurekka.vo.Product;
import com.ssafy.eurekka.vo.Refrigerator;
import com.ssafy.eurekka.vo.User;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RefrigeratorServiceImpl implements RefrigeratorService{

  @Autowired
  private RefrigeratorRepository refrigeratorRepository;
  @Autowired
  private ProductRepository productRepository;
  @Autowired
  private UserRepository userRepository;

  private class ProductComparator implements Comparator<Product> {

    @Override
    public int compare(Product o1, Product o2) {
      return o1.getExpirationDate().compareTo(o2.getExpirationDate());
    }
  }

  @Override
  public Product createProduct(ObjectId id, Product product) {
    //product db에 저장
    Product created = productRepository.save(product);

    //refrigerator에 product 추가
    Optional<Refrigerator> found = refrigeratorRepository.findById(id);
    if (found.isPresent()) {
      Refrigerator refrigerator = found.get();
      int category = created.getCategory();
      List<Product> productList = getProductListByCategory(refrigerator, category);
      productList.add(created);
      refrigerator = setProductListByCategory(refrigerator, productList, category);
      refrigeratorRepository.save(refrigerator);
      return created;
    }

    return null;
  }

  @Override
  public List<Product> findAllProduct(ObjectId id) {
    Optional<Refrigerator> found = refrigeratorRepository.findById(id);
    if (found.isPresent()) {
      Refrigerator refrigerator = found.get();
      List<Product> productList = new ArrayList<>();
      productList.addAll(refrigerator.getNoodles());
      productList.addAll(refrigerator.getSnack());
      productList.addAll(refrigerator.getBeverage());
      productList.addAll(refrigerator.getPickles());
      productList.addAll(refrigerator.getDiary());
      productList.addAll(refrigerator.getHealth());
      productList.addAll(refrigerator.getPowder());
      productList.addAll(refrigerator.getMeat());
      productList.addAll(refrigerator.getSeasoning());
      productList.addAll(refrigerator.getOcean());
      productList.addAll(refrigerator.getFresh());
      productList.addAll(refrigerator.getAlcohol());
      productList.addAll(refrigerator.getFrozen());
      productList.addAll(refrigerator.getIces());
      productList.addAll(refrigerator.getOthers());

      //유통기한 순으로 정렬
      productList.sort(new ProductComparator());

      //d-day 계산해서 return
      return getDday(productList);
    }

    return null;
  }

  @Override
  public List<Product> findByCategory(ObjectId id, int category) {
    Optional<Refrigerator> found = refrigeratorRepository.findById(id);
    if (found.isPresent()) {
      Refrigerator refrigerator = found.get();
      List<Product> productList = getProductListByCategory(refrigerator, category);

      //유통기한 순으로 정렬
      productList.sort(new ProductComparator());

      //d-day 계산해서 return
      return getDday(productList);
    }

    return null;
  }

  @Override
  public void updateAbandon(String email, Product product) {
    User user = userRepository.findByEmail(email);
    ObjectId refrigerId = user.getRefrigeratorId();
    int category = product.getCategory();

    //냉장고에서 제품 제거
    updateDone(refrigerId, category, product);

    //user에 product 정보 추가
    DoneProduct done = new DoneProduct(new Date(System.currentTimeMillis()), category);
    List<DoneProduct> doneList = user.getAbandoned();
    if (doneList == null) {
      doneList = new ArrayList<>();
    }
    doneList.add(done);
    user.setAbandoned(doneList);
    userRepository.save(user);
  }

  @Override
  public void updateEat(String email, Product product) {
    User user = userRepository.findByEmail(email);
    ObjectId refrigerId = user.getRefrigeratorId();
    int category = product.getCategory();

    //냉장고에서 제품 제거
    updateDone(refrigerId, category, product);

    //user에 product 정보 추가
    DoneProduct done = new DoneProduct(new Date(System.currentTimeMillis()), category);
    List<DoneProduct> doneList = user.getEaten();
    if (doneList == null) {
      doneList = new ArrayList<>();
    }
    doneList.add(done);
    user.setEaten(doneList);
    userRepository.save(user);
  }

  private void updateDone(ObjectId refrigerId, int category, Product product) {
    //product db에서 삭제
    productRepository.delete(product);

    //refrigerator에서 product 삭제
    Optional<Refrigerator> found = refrigeratorRepository.findById(refrigerId);
    if (found.isPresent()) {
      Refrigerator refrigerator = found.get();
      List<Product> productList = getProductListByCategory(refrigerator, category);
      productList.remove(product);
      refrigerator = setProductListByCategory(refrigerator, productList, category);
      refrigeratorRepository.save(refrigerator);
    }
  }

  private List<Product> getDday(List<Product> productList) {
    for (Product p : productList) {
      SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
      try {
        Date today = formatter.parse(formatter.format(new Date()));
        Date dday = formatter.parse(formatter.format(p.getExpirationDate()));
        long diff = (dday.getTime() - today.getTime()) / (24*60*60*1000);
        p.setDDay((int)diff);
      } catch (ParseException e) {
        e.printStackTrace();
      }
    }
    return productList;
  }

  private List<Product> getProductListByCategory(Refrigerator refrigerator, int category) {
    List<Product> productList = null;
    switch (category) {
      case 0:
        productList = refrigerator.getNoodles();
        break;
      case 1:
        productList = refrigerator.getSnack();
        break;
      case 2:
        productList = refrigerator.getBeverage();
        break;
      case 3:
        productList = refrigerator.getPickles();
        break;
      case 4:
        productList = refrigerator.getDiary();
        break;
      case 5:
        productList = refrigerator.getHealth();
        break;
      case 6:
        productList = refrigerator.getPowder();
        break;
      case 7:
        productList = refrigerator.getMeat();
        break;
      case 8:
        productList = refrigerator.getSeasoning();
        break;
      case 9:
        productList = refrigerator.getOcean();
        break;
      case 10:
        productList = refrigerator.getFresh();
        break;
      case 11:
        productList = refrigerator.getAlcohol();
        break;
      case 12:
        productList = refrigerator.getFrozen();
        break;
      case 13:
        productList = refrigerator.getIces();
        break;
      case 14:
        productList = refrigerator.getOthers();
        break;
    }
    return productList;
  }

  private Refrigerator setProductListByCategory(Refrigerator refrigerator, List<Product> productList, int category) {
    switch (category) {
      case 0:
        refrigerator.setNoodles(productList);
        break;
      case 1:
        refrigerator.setSnack(productList);
        break;
      case 2:
        refrigerator.setBeverage(productList);
        break;
      case 3:
        refrigerator.setPickles(productList);
        break;
      case 4:
        refrigerator.setDiary(productList);
        break;
      case 5:
        refrigerator.setHealth(productList);
        break;
      case 6:
        refrigerator.setPowder(productList);
        break;
      case 7:
        refrigerator.setMeat(productList);
        break;
      case 8:
        refrigerator.setSeasoning(productList);
        break;
      case 9:
        refrigerator.setOcean(productList);
        break;
      case 10:
        refrigerator.setFresh(productList);
        break;
      case 11:
        refrigerator.setAlcohol(productList);
        break;
      case 12:
        refrigerator.setFrozen(productList);
        break;
      case 13:
        refrigerator.setIces(productList);
        break;
      case 14:
        refrigerator.setOthers(productList);
        break;
    }
    return refrigerator;
  }

}
