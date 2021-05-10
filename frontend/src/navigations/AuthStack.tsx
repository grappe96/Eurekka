import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen, ProductListScreen, BarcodeScreen } from '../screens';

const Stack = createStackNavigator();

// 인증 관련 컴포넌트를 저장하는 navigation stack
const AuthStack = () => {
  const theme = useContext<{
    background: string;
    text: string;
  }>(ThemeContext);

  // stack에 등록할 컴포넌트들, 초기 화면인 Login에 헤더 숨기는 옵션
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="SelectButton" component={BarcodeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
