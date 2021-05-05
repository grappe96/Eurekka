import React, { useContext } from 'react';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { images } from '../common/images';
import { theme } from '../common/theme';
import { UserContext } from '../contexts';
import AsyncStoarage from '@react-native-community/async-storage';

// kakao 로그인 실행하는 첫 화면
const LoginScreen = () => {
  // style
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.background,
    },
    header: {
      flex: 2,
      alignItems: 'center',
    },
    logo: {
      width: '80%',
      height: '80%',
      resizeMode: 'contain',
      marginTop: 10,
    },
    body: {
      flex: 5,
      alignItems: 'center',
    },
    img: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      padding: 10,
    },
    footer: {
      flex: 1,
    },
    btnImg: {
      height: '100%',
      width: '60%',
      resizeMode: 'contain',
      alignSelf: 'center',
    },
  });

  const { updateInfo, userInfo } = useContext(UserContext);

  // kakao login 실행되면 받는 인증 토큰 서버로 전달
  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    axios
      .post(`http://10.0.2.2:8080/user/kakao/login`, {
        token: token.accessToken,
      })
      .then((res) => {
        AsyncStoarage.setItem('token', res.data.jwt);
        updateInfo(res.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 시작화면 (로고, 냉장고, 로그인 버튼)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={images.loadImg} style={styles.logo} />
      </View>
      <View style={styles.body}>
        <Image source={images.fridgeImg} style={styles.img} />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPressOut={() => signInWithKakao()}>
          <Image source={images.btnImg} style={styles.btnImg} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
