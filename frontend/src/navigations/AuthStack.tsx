import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen, BarcodeViewScreen } from '../screens';

const Stack = createStackNavigator();

const AuthStack = () => {
  const theme = useContext<{
    background: string;
    text: string;
  }>(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="BarcodeView"
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BarcodeView" component={BarcodeViewScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
