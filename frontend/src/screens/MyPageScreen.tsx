import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPageScreen = () => {
  const [token, setToken] = useState<String>('');
  AsyncStorage.getItem('token', (err, res) => {
    setToken(res);
  });
  const getUserInfo = async () => {};
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
