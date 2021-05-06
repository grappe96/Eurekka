import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { UserContext } from '../contexts';
import MainStack from './MainStack';

const Navigation = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <NavigationContainer>
      {userInfo?.id ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
