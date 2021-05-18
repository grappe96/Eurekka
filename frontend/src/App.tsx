import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, AppState, Alert } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './common/theme';
import Navigation from './navigations';
import { RegisterProvider, TokenProvider, AlarmProvider } from './contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import NotifiService from '../NotifiService';

// Root 역할을 하는 컴포넌트
const App = () => {
  const [state, setState] = useState({});
  const onRegister = (token) => {
    setState({ registerToken: token.token, fcmRegistered: true });
  };
  const onNotif = (notif) => {
    const data = notif.data;
    Alert.alert(data.body, data.title);
  };
  const handlePerm = (permission) => {
    Alert.alert('Permissions', JSON.stringify(permission));
  };
  const notif = new NotifiService(onRegister, onNotif);

  const childRef = useRef(null);
  const appState = useRef(AppState.currentState);

  const _handleAppStateChange = async (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      const res = await AsyncStorage.getItem('alarm');
      if (res == 'exist') {
        childRef.current.changeHasAlarmToTrue();
        AsyncStorage.setItem('alarm', '');
      }
    }

    appState.current = nextAppState;
  };

  // 디바이스 토큰 가져오기
  const getDeviceToken = async () => {
    const deviceToken = await messaging().getToken();
    AsyncStorage.setItem('deviceToken', deviceToken);
  };

  //어플이 실행 중일 때 푸시 알림이 오면
  const forgroundListener = () => {
    messaging().onMessage(async (message) => {
      childRef.current.changeHasAlarmToTrue();
    });
  };

  useEffect(() => {
    getDeviceToken();
    forgroundListener();

    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
      notif.cancelAll();
    };
  }, []);

  // src/theme.tsx 적용, 상태바 숨김, Nagivation에 등록된 화면들 조회
  return (
    <ThemeProvider theme={theme}>
      <TokenProvider>
        <RegisterProvider>
          <AlarmProvider>
            <StatusBar hidden />
            <Navigation
              ref={(ref) => {
                childRef.current = ref;
              }}
            />
          </AlarmProvider>
        </RegisterProvider>
      </TokenProvider>
    </ThemeProvider>
  );
};

export default App;
