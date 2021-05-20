package com.ssafy.eurekka.util;

import com.google.gson.Gson;
import com.ssafy.eurekka.config.MattermostConfig;
import com.ssafy.eurekka.util.MattermostMessage.Attachment;
import com.ssafy.eurekka.util.MattermostMessage.Attachments;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class MattermostSender {

  @Value("${notification.mattermost.enabled}")
  private boolean enabled;
  @Value("${notification.mattermost.webhook-url}")
  private String webhookUrl;

  @Autowired
  private final RestTemplate restTemplate;
  private final MattermostConfig mattermostConfig;

  public void sendMessage(Exception e, String uri, String params) {
    if (!enabled) {
      return;
    }

    Attachment attachment = Attachment.builder()
        .color(mattermostConfig.getColor())
        .title(mattermostConfig.getTitle())
        .text(mattermostConfig.getText())
        .footer(mattermostConfig.getFooter())
        .build();
    attachment.addExceptionInfo(e, uri, params);
    Attachments attachments = new Attachments(attachment);
    attachments.addProps(e);

    String body = new Gson().toJson(attachments);
    HttpHeaders headers = new HttpHeaders();
    headers.set("Content-type", MediaType.APPLICATION_JSON_VALUE);
    HttpEntity<String> entity = new HttpEntity<>(body, headers);
    restTemplate.postForEntity(webhookUrl, entity, String.class);
  }

}
