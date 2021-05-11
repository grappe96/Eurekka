import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { images } from '../common/images';
import { theme } from '../common/theme';
import constant from '../common/Constant';

// 메인 화면 (열린 냉장고)
const HomeScreen = ({ navigation }) => {
  const btnHeight = (constant.width * 1.05) / 4.7;
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
      top: (constant.height - constant.width) / 3,
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
  });

  // 빈 냉장고 위에 4개씩 가로 정렬된 TouchableOpacity 4행 안에 각 카테고리에 맞는 이미지와 navitate params
  return (
    <View style={styles.container}>
      <Image source={images.openImg} style={styles.background} />
      <View style={styles.btnContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            onPressOut={() =>
              navigation.navigate('ProductList', {
                category: 5,
              })
            }
          >
            <View style={styles.side}>
              <Image source={images.health} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={() =>
              navigation.navigate('ProductList', {
                category: 6,
              })
            }
          >
            <View style={styles.center}>
              <Image source={images.powder} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={() =>
              navigation.navigate('ProductList', {
                category: 1,
              })
            }
          >
            <View style={styles.center}>
              <Image source={images.snack} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={() =>
              navigation.navigate('ProductList', {
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
            onPressOut={() =>
              navigation.navigate('ProductList', {
                category: 8,
              })
            }
          >
            <View style={styles.side}>
              <Image source={images.seasoning} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={() =>
              navigation.navigate('ProductList', {
                category: 0,
              })
            }
          >
            <View style={styles.center}>
              <Image source={images.noodles} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={() =>
              navigation.navigate('ProductList', {
                category: 4,
              })
            }
          >
            <View style={styles.center}>
              <Image source={images.diary} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={() =>
              navigation.navigate('ProductList', {
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
            onPressOut={() =>
              navigation.navigate('ProductList', {
                category: 13,
              })
            }
          >
            <View style={styles.side}>
              <Image source={images.ices} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={() =>
              navigation.navigate('ProductList', {
                category: 9,
              })
            }
          >
            <View style={styles.center}>
              <Image source={images.ocean} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={() =>
              navigation.navigate('ProductList', {
                category: 7,
              })
            }
          >
            <View style={styles.center}>
              <Image source={images.meat} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={() =>
              navigation.navigate('ProductList', {
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
            onPressOut={() =>
              navigation.navigate('ProductList', {
                category: 14,
              })
            }
          >
            <View style={styles.side}>
              <Image source={images.others} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={() =>
              navigation.navigate('ProductList', {
                category: 12,
              })
            }
          >
            <View style={styles.center}>
              <Image source={images.frozen} style={styles.icon}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={() =>
              navigation.navigate('ProductList', {
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
    </View>
  );
};

export default HomeScreen;
