package com.ssafy.eurekka.vo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ssafy.eurekka.util.CustomObjectIdSerializer;
import java.util.Date;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

  @JsonSerialize(using = CustomObjectIdSerializer.class)
  @Id
  private ObjectId id;

  private String name;
  @Temporal(TemporalType.TIMESTAMP)
  private Date expirationDate;
  private String ingredient;

  private int category;
}
