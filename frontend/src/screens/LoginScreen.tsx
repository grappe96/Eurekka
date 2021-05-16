import React, { useContext, useState } from 'react';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { images } from '../common/images';
import { theme } from '../common/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenContext } from '../contexts';

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

  const { updateToken } = useContext(TokenContext);
  const [deviceToken, setDeviceToken] = useState('');
  AsyncStorage.getItem('deviceToken', (err, res) => setDeviceToken(res));

  // kakao login 실행되면 받는 인증 토큰 서버로 전달
  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    if (deviceToken.length > 0) {
      axios
        .post(
          `http://k4a404.p.ssafy.io:5000/user/kakao/login`,
          {
            token: token.accessToken,
          },
          {
            headers: {
              deviceToken: deviceToken,
            },
          }
        )
        .then((res) => {
          // 서버에서 받은 jwt와 사용자 정보 저장
          AsyncStorage.setItem('token', res.data.jwt);
          AsyncStorage.setItem('userInfo', JSON.stringify(res.data.user));
          updateToken(res.data.jwt);
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
        <TouchableOpacity onPress={() => signInWithKakao()}>
          <Image source={images.btnImg} style={styles.btnImg} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
