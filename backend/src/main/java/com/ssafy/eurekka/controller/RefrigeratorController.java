package com.ssafy.eurekka.controller;

import com.ssafy.eurekka.service.JwtService;
import com.ssafy.eurekka.service.RefrigeratorService;
import com.ssafy.eurekka.vo.Product;
import com.ssafy.eurekka.vo.Refrigerator;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/refrigerator")
public class RefrigeratorController {

  @Autowired
  private RefrigeratorService refrigeratorService;
  @Autowired
  private JwtService jwtService;

  @ApiOperation(value = "제품등록", notes = "냉장고 id와 제품 정보를 받아 제품 등록")
  @PostMapping("/{refrigerId}")
  public ResponseEntity<?> createProduct(@PathVariable("refrigerId") ObjectId id, @RequestBody Product product) {
    Refrigerator result = refrigeratorService.createProduct(id, product);
    if (result == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    } else {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
  }

  @ApiOperation(value = "전체제품조회", notes = "냉장고 id를 인자로 받아 해당 냉장고(document)에 있는 전체 제품 반환")
  @GetMapping("/{refrigerId}")
  public ResponseEntity<?> findAllProduct(@PathVariable("refrigerId") ObjectId id) {
    List<Product> result = refrigeratorService.findAllProduct(id);
    if (result == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(result, HttpStatus.OK);
  }

  @ApiOperation(value = "카테고리별조회", notes = "냉장고 id와 category 코드를 받아 Product list 반환")
  @GetMapping("/{refrigerId}/{category}")
  public ResponseEntity<?> findByCategory(@PathVariable("refrigerId") ObjectId id, @PathVariable int category) {
    List<Product> result = refrigeratorService.findByCategory(id, category);
    if (result == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(result, HttpStatus.OK);
  }

  @ApiOperation(value = "버림", notes = "사용자, 냉장고 id와 카테고리, 제품 정보를 받아 처리")
  @PostMapping("/abandon")
  public ResponseEntity<?> updateAbandon(HttpServletRequest req, @RequestBody Product product) {
    // 헤더의 jwt를 복호화하여 email 가져오기
    String jwt = req.getHeader("jwt");
    String email = jwtService.decode(jwt);

    refrigeratorService.updateAbandon(email, product);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @ApiOperation(value = "먹음", notes = "사용자, 냉장고 id와 카테고리, 제품 정보를 받아 처리")
  @PostMapping("/eat")
  public ResponseEntity<?> updateEat(HttpServletRequest req, @RequestBody Product product) {
    // 헤더의 jwt를 복호화하여 email 가져오기
    String jwt = req.getHeader("jwt");
    String email = jwtService.decode(jwt);

    refrigeratorService.updateEat(email, product);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
