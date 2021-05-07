import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { images } from '../../common/images';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Footer = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#bacde6',
    },
    img: {
      width: 70,
      height: 70,
    },
    btnContainer: {
      flexDirection: 'row',
    },
    recipeBtn: {
      bottom: -20,
      left: -20,
    },
    registerBtn: {
      bottom: 5,
    },
    listBtn: {
      bottom: -20,
      right: -20,
    },
  });

  const [isClick, setIsClick] = useState<boolean>(false);
  const toggleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <View style={styles.container}>
      {isClick && (
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.recipeBtn}>
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
          <Image source={images.coloredMenu} style={styles.img} />
        ) : (
          <Image source={images.menu} style={styles.img} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
