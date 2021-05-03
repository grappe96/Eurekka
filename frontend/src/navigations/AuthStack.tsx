import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen } from '../screens';

const Stack = createStackNavigator();

const AuthStack = () => {
  const theme = useContext<{
    background: string;
    text: string;
  }>(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
