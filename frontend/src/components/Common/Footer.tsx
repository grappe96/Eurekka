import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { images } from '../../common/images';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../common/theme';

// Footer Component
const Footer = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bar: {
      position: 'absolute',
      top: 30,
      backgroundColor: '#bacde6',
      height: 70,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
      width: 70,
      height: 70,
      top: 15,
    },
    clickedImg: {
      width: 70,
      height: 70,
      top: -5,
    },
    btnContainer: {
      flexDirection: 'row',
    },
    recipeBtn: {
      bottom: -15,
      left: -20,
    },
    registerBtn: {},
    listBtn: {
      bottom: -15,
      right: -20,
    },
  });

  const [isClick, setIsClick] = useState<boolean>(false);
  // 하단 버튼 클릭 시 toggle
  const toggleClick = () => {
    setIsClick(!isClick);
  };

  // 하단 버튼 클릭 하면 화면 이동 버튼 등장
  return (
    <View style={styles.container}>
      <View style={styles.bar}></View>
      {isClick && (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.recipeBtn}
            onPressOut={() => navigation.navigate('RecipeList')}
          >
            <MaterialCommunityIcons name="chef-hat" size={36} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerBtn}
            onPressOut={() => navigation.navigate('Register')}
          >
            <MaterialCommunityIcons name="barcode-scan" size={36} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listBtn}
            onPressOut={() => navigation.navigate('ProductList')}
          >
            <MaterialCommunityIcons name="view-list" size={36} />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPressOut={() => toggleClick()}>
        {isClick ? (
          <Image source={images.menu} style={styles.clickedImg} />
        ) : (
          <Image source={images.coloredMenu} style={styles.img} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
