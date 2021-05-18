import PushNotification from 'react-native-push-notification';

class NotifiHandler {
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

  attachRegister(handler) {
    this.onRegister = handler;
  }

  attachNotification(handler) {
    this.onNotification = handler;
  }
}

const handler = new NotifiHandler();

PushNotification.configure({
  // (iOS and Android)
  onRegister: handler.onRegister.bind(handler),
  onNotification: handler.onNotification.bind(handler),

  // IOS ONLY
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: true,
});

export default handler;
