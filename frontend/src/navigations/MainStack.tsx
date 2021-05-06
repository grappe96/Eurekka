import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, ProductListScreen } from '../screens';
import Header from '../components/Common/Header';

const Stack = createStackNavigator();

// 인증 후 사용하는 모든 화면이 담긴 navigation stack
const MainStack = () => {
  const theme = useContext<{
    background: string;
    text: string;
  }>(ThemeContext);

  // stack에 등록할 컴포넌트들
  return (
    <Stack.Navigator
      initialRouteName="ProductList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#bacde6',
        },
        headerTitle: () => <Header />,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
