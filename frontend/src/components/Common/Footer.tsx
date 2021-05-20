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
      top: -10,
    },
    btnContainer: {
      flexDirection: 'row',
    },
    recipeBtn: {
      bottom: -15,
      left: -20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#95A0C0',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    registerBtn: {
      bottom: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#606DCA',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    listBtn: {
      bottom: -15,
      right: -20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0C276F',
      width: 50,
      height: 50,
      borderRadius: 25,
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
            onPress={() => navigation.navigate('RecipeList')}
          >
            <MaterialCommunityIcons name="chef-hat" size={30} color="#F0F0FA" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => navigation.navigate('Register')}
          >
            <MaterialCommunityIcons
              name="plus-thick"
              size={30}
              color="#F0F0FA"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listBtn}
            onPress={() => navigation.navigate('ProductList')}
          >
            <MaterialCommunityIcons
              name="view-list"
              size={30}
              color="#F0F0FA"
            />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={() => toggleClick()}>
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
