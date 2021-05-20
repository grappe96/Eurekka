package com.ssafy.eurekka.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
public class NotificationManager {

  @Autowired
  @Lazy
  private MattermostSender mattermostSender;

  public void sendMattermost(Exception e, String uri, String params) {
    mattermostSender.sendMessage(e, uri, params);
  }
}
