import PushNotification, { Importance } from 'react-native-push-notification';
import NotificationHandler from './NotificationHandler';

export default class NotifService {
  lastId: number;
  lastChannelCounter: number;
  constructor(onRegister, onNotification) {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    this.createDefaultChannels();

    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);

    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });

    PushNotification.getChannels(function (channels) {
      console.log(channels);
    });
  }

  createDefaultChannels() {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id',
        channelName: `Default channel`,
        channelDescription: 'A default channel',
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created) =>
        console.log(`createChannel 'default-channel-id' returned '${created}'`)
    );
  }

  createOrUpdateChannel() {
    this.lastChannelCounter++;
    PushNotification.createChannel(
      {
        channelId: 'custom-channel-id',
        channelName: `Custom channel - Counter: ${this.lastChannelCounter}`,
        channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  }

  popInitialNotification() {
    PushNotification.popInitialNotification((notification) =>
      console.log('InitialNotication:', notification)
    );
  }

  localNotif(title, message) {
    this.lastId++;
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      ticker: 'My Notification Ticker',
      autoCancel: true,
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_notification',
      bigText: message,
      subText: '유통기한부터 레시피까지',
      color: 'blue',
      vibrate: true,
      vibration: 300,
      tag: 'some_tag',
      group: 'group',
      groupSummary: false,
      ongoing: false,
      actions: ['확인'],
      invokeApp: false,

      when: null,
      usesChronometer: false,
      timeoutAfter: null,

      category: '',

      id: this.lastId,
      title: title,
      message: message,
      userInfo: { screen: 'home' },
      playSound: !!'sample.mp3',
      soundName: 'default',
      number: 1,
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

  getScheduledLocalNotifications(callback) {
    PushNotification.getScheduledLocalNotifications(callback);
  }

  getDeliveredNotifications(callback) {
    PushNotification.getDeliveredNotifications(callback);
  }
}
