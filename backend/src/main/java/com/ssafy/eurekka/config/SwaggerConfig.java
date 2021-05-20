package com.ssafy.eurekka.config;

import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

  private final String VERSION = "V1";
  private final String TITLE = "A404 API" + VERSION;

  @Bean
  public Docket api() {
    List<ResponseMessage> responseMessageList = new ArrayList<>();
    responseMessageList.add(new ResponseMessageBuilder()
        .code(200).message("OK !!!").build());
    responseMessageList.add(new ResponseMessageBuilder()
        .code(500).message("서버 문제 발생 !!!").responseModel(new ModelRef("Error")).build());
    responseMessageList.add(new ResponseMessageBuilder()
        .code(404).message("페이지를 찾을 수 없습니다 !!!").build());

    return new Docket(DocumentationType.SWAGGER_2)
        .select()
        .apis(RequestHandlerSelectors.basePackage("com.ssafy.eurekka.controller"))
        .paths(PathSelectors.any())
        .build()
        .apiInfo(apiInfo());
  }

  private ApiInfo apiInfo() {
    return new ApiInfoBuilder()
        .title(TITLE)
        .version("1.0")
        .build();
  }
}
