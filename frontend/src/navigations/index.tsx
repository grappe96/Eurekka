import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Navigation Stack 관리하는 Container
const Navigation = () => {
  // 저장된 토큰 불러오기
  const [token, setToken] = useState<string>('');
  AsyncStorage.getItem('token', (err, res) => {
    setToken(res);
  });

  // 토큰 유무에 따라 스택 변경
  return (
    <NavigationContainer>
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
