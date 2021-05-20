import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { images } from '../common/images';
import { theme } from '../common/theme';
import constant from '../common/Constant';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 메인 화면 (열린 냉장고)
const HomeScreen = ({ navigation }) => {
  const btnHeight = (constant.width * 1.05) / 4.75;
  const btnWidth = constant.width / 4.2;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    background: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    btnContainer: {
      position: 'absolute',
      top: (constant.height - constant.width) / 2.85,
      left: constant.width * 0.07,
    },
    row: {
      flexDirection: 'row',
    },
    side: {
      width: btnWidth * 0.8,
      height: btnHeight,
      alignItems: 'center',
    },
    center: {
      width: btnWidth,
      height: btnHeight,
      alignItems: 'center',
    },
    icon: {
      width: 50,
      height: 50,
    },
    title: {
      backgroundColor: '#ffffff',
      alignSelf: 'center',
      marginTop: 20,
      width: 230,
      height: 50,
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    img: {
      width: 30,
      height: 30,
      marginRight: 10,
      alignSelf: 'center',
    },
    text: {
      alignSelf: 'center',
    },
    bottom: {
      backgroundColor: '#00ff0000',
      position: 'absolute',
      bottom: 20,
      width: '100%',
      alignItems: 'center',
    },
    slogan: {
      width: '70%',
      height: 40,
      resizeMode: 'contain',
    },
  });

  const [token, setToken] = useState<String>('');
  const [img, setImg] = useState(images.img1);
  const [name, setName] = useState('');
  AsyncStorage.getItem('token', (err, res) => {
    setToken(res);
  });

  const getUserInfo = () => {
    axios
      .get(`http://eurekka.kr:5000/user/info`, {
        headers: {
          'content-type': 'application/json',
          jwt: token,
        },
      })
      .then(({ data }) => {
        setName(data.name);
        switch (data.profileImg) {
          case 'img1':
            setImg(images.img1);
            break;
          case 'img2':
            setImg(images.img2);
            break;
          case 'img3':
            setImg(images.img3);
            break;
          case 'img4':
            setImg(images.img4);
            break;
          case 'img5':
            setImg(images.img5);
            break;
          case 'img6':
            setImg(images.img6);
            break;
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    if (token.length > 0) {
      getUserInfo();
    }
  }, [token]);
  useEffect(() => {
    const reload = navigation.addListener('focus', () => {
      if (token.length > 0) {
        getUserInfo();
      }
    });
    return reload;
  }, [navigation, token]);

  // 빈 냉장고 위에 4개씩 가로 정렬된 TouchableOpacity 4행 안에 각 카테고리에 맞는 이미지와 navitate params
  return (
    <View style={styles.container}>
      <Image source={images.openImg} style={styles.background} />
      <View style={styles.title}>
        <Image source={img} style={styles.img} />
        <Text style={styles.text}>{name}님의 냉장고 입니다.</Text>
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetailList', {
                category: 5,
              })
            }
          >
            <View style={styles.side}>
              <Image source={images.health} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetailList', {
                category: 6,
              })
            }
          >
            <View style={styles.center}>
              <Image source={images.powder} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetailList', {
                category: 1,
              })
            }
          >
            <View style={styles.center}>
              <Image source={images.snack} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetailList', {
                category: 11,
              })
            }
          >
            <View style={styles.side}>
              <Image source={images.alcohol} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetailList', {
                category: 8,
              })
            }
          >
            <View style={styles.side}>
              <Image source={images.seasoning} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetailList', {
                category: 0,
              })
            }
          >
            <View style={styles.center}>
              <Image source={images.noodles} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetailList', {
                category: 4,
              })
            }
          >
            <View style={styles.center}>
              <Image source={images.diary} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetailList', {
                category: 2,
              })
            }
          >
            <View style={styles.side}>
              <Image source={images.beverage} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetailList', {
                category: 13,
              })
            }
          >
            <View style={styles.side}>
              <Image source={images.ices} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetailList', {
                category: 9,
              })
            }
          >
            <View style={styles.center}>
              <Image source={images.ocean} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetailList', {
                category: 7,
              })
            }
          >
            <View style={styles.center}>
              <Image source={images.meat} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetailList', {
                category: 3,
              })
            }
          >
            <View style={styles.side}>
              <Image source={images.pickles} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetailList', {
                category: 14,
              })
            }
          >
            <View style={styles.side}>
              <Image source={images.others} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetailList', {
                category: 12,
              })
            }
          >
            <View style={styles.center}>
              <Image source={images.frozen} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetailList', {
                category: 10,
              })
            }
          >
            <View style={styles.center}>
              <Image source={images.fresh} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.side}></View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottom}>
        <Image source={images.slogan} style={styles.slogan} />
      </View>
    </View>
  );
};

export default HomeScreen;
