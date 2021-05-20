package com.ssafy.eurekka.vo;

import java.util.Date;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoneProduct {

  @Temporal(TemporalType.TIMESTAMP)
  private Date recordDate;
  private int category;
}
