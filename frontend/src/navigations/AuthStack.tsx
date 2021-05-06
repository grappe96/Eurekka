import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens';

const Stack = createStackNavigator();

// 인증 관련 컴포넌트를 저장하는 navigation stack
const AuthStack = () => {
  // stack에 등록할 컴포넌트들, 초기 화면인 Login에 헤더 숨기는 옵션
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
