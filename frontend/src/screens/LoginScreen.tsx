import React, { useState } from 'react';
import styled from 'styled-components/native';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import { Text, Button } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
  `;

  const [result, setResult] = useState<string>('');

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    setResult(JSON.stringify(token.accessToken));
    // console.log(result);
    const res = await axios.post(`http://localhost:8080/user/kakao/login`, {
      token: result,
    });
    console.log(res);
    // navigation.navigate('Home');
  };

  return (
    <Container>
      <Text style={{ fontSize: 30 }}>Login Screen</Text>
      <Button title="카카오 로그인" onPress={() => signInWithKakao()} />
    </Container>
  );
};

export default LoginScreen;
