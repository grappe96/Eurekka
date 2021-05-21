import PushNotification from 'react-native-push-notification';

class NotificationHandler {
  onNotification(notification) {
    if (typeof this.onNotification === 'function') {
      this.onNotification(notification);
    }
  }

  onRegister(token) {
    if (typeof this.onRegister === 'function') {
      this.onRegister(token);
    }
  }

  onAction(notification) {
    if (notification.action === '확인') {
      PushNotification.invokeApp(notification);
    }
  }

  onRegistrationError(err) {
    console.log(err);
  }

  attachRegister(handler) {
    this.onRegister = handler;
  }

  attachNotification(handler) {
    this.onNotification = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  onRegister: handler.onRegister.bind(handler),
  onNotification: handler.onNotification.bind(handler),
  onAction: handler.onAction.bind(handler),
  onRegistrationError: handler.onRegistrationError.bind(handler),
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export default handler;
