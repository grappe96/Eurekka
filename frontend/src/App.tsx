import React, { useEffect, useContext } from 'react';
import { StatusBar, Alert } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './common/theme';
import Navigation from './navigations';
import { RegisterProvider, TokenProvider, TokenContext } from './contexts';
import messaging from '@react-native-firebase/messaging';
import { fcmService } from '../FCMService';
import { localNotificationService } from '../LocalNotificationService';

// Root 역할을 하는 컴포넌트
const App = () => {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister : token :', token);
    }

    function onNotification(notify) {
      console.log('[App] onNotification : notify :', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      );
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification : notify :', notify);
      alert('Open Notification : notify.body :' + notify.body);
    }
    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unRegister();
    };
  }, []);

  const { updateDeviceToken } = useContext(TokenContext);
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    // await Alert.alert(fcmToken);
    updateDeviceToken(fcmToken);
  };
  useEffect(() => {
    getFcmToken();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  });

  // src/theme.tsx 적용, 상태바 숨김, Nagivation에 등록된 화면들 조회
  return (
    <ThemeProvider theme={theme}>
      <TokenProvider>
        <RegisterProvider>
          <StatusBar hidden />
          <Navigation />
        </RegisterProvider>
      </TokenProvider>
    </ThemeProvider>
  );
};

export default App;
