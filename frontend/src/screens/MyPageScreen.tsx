import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Button } from 'react-native';

const MyPageScreen = () => {
  const logout = async () => {
    try {
      await AsyncStorage.clear();
      alert('logout');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View>
      <Button title="로그아웃" onPress={() => logout()} />
    </View>
  );
};

export default MyPageScreen;
