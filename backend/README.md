- #### Flask

  #### 가상 환경 구축

  ```bash
  python -m venv venv
  source venv/Scripts/activate
  pip install -r requirements.txt
  ```

  ##### local에서 실행하기(Windows OS에서 실행 X)

  ```bash
  cd flask
  gunicorn "app.create_app:create_app()"
  ```

  ##### server에서 실행하기(docker compose로 Nginx + gunicorn + flask 구조를 일관적으로 배포)

  ```bash
  cd flask
  docker-compose up
  ```

- #### Spring Boot

  ##### 1. lombok 설치

  ##### 2. application.properties 설정 

  ```
  ## MongoDB Config ##
  spring.data.mongodb.uri={uri}
  spring.data.mongodb.database={database}
  spring.data.mongodb.username={username}
  spring.data.mongodb.password={password}
  
  spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
  
  #MatterMost
  notification.mattermost.enabled=true
  notification.mattermost.webhook-url={mattermost webhook-url}
  
  ## JWT ##
  JWT.ISSUER={ISSUER}
  JWT.SECRET={SECRET}
  
  ## Naver OCR ##
  OCR.APIURL={APIURL}
  OCR.SECRETKEY={SECRETKEY}
  ```

