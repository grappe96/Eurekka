import React, { useContext, forwardRef, useImperativeHandle } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenContext, AlarmContext } from '../contexts';

// Navigation Stack 관리하는 Container
const Navigation = forwardRef((props, ref) => {
  // 저장된 토큰 불러오기
  const { token, updateToken } = useContext(TokenContext);
  const { updateHasAlarm } = useContext(AlarmContext);

  useImperativeHandle(ref, () => ({
    changeHasAlarmToTrue: () => {
      updateHasAlarm(true);
    },
  }));

  if (token == '') {
    AsyncStorage.getItem('token', (err, res) => {
      updateToken(res);
    });
  }

  // 토큰 유무에 따라 스택 변경
  return (
    <NavigationContainer>
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
});

export default Navigation;
