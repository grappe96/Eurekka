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
public class User {

  @JsonSerialize(using = CustomObjectIdSerializer.class)
  @Id
  private ObjectId id;

  private String email;
  private String name;
  private String profileImg;
  @JsonSerialize(using = CustomObjectIdSerializer.class)
  private ObjectId refrigeratorId;

  private List<DoneProduct> abandoned;
  private List<DoneProduct> eaten;

  private int alarmCycle;
}
