import PushNotification from 'react-native-push-notification';
import NotificationHandler from './NotifiHandler';

export default class NotifiService {
  lastId: number;
  constructor(onRegister, onNotification) {
    this.lastId = 0;

    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);

    // badge number clear
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
  }

  localNotif(title, message) {
    this.lastId++;
    PushNotification.localNotification({
      /* Android Only */
      id: this.lastId,
      ticker: 'My Notification Ticker',
      autoCancel: true,
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_notification',
      bigText: title,
      subText: message,
      color: 'red',
      vibrate: true,
      vibration: 300,
      tag: 'some_tag',
      group: 'group',
      ongoing: false,

      /* iOS and Android */
      title: title,
      message: message,
      soundName: 'default',
      number: 10,
      actions: '["Yes", "No"]',
    });
  }

  scheduleNotif(soundName) {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + 30 * 1000),

      /* Android */
      id: this.lastId,
      ticker: 'My Notification Ticker',
      autoCancel: true,
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_notification',
      bigText: 'My big text that will be shown when notification is expanded',
      subText: 'This is a subText',
      color: 'blue',
      vibrate: true,
      vibration: 300,
      tag: 'some_tag',
      group: 'group',
      ongoing: false,

      /* iOS and Android */
      title: 'Scheduled Notification',
      message: 'My Notification Message',
      playSound: !!soundName,
      number: 10,
      soundName: soundName ? soundName : 'default',
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  requestPermissions() {
    return PushNotification.requestPermissions();
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({ id: '' + this.lastId });
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  abandonPermissions() {
    PushNotification.abandonPermissions();
  }
}
