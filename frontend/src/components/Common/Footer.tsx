import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { images } from '../../common/images';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Footer = () => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#bacde6',
    },
    img: {
      width: 75,
      height: 75,
      marginBottom: 100,
    },
  });

  const [isClick, setIsClick] = useState<boolean>(false);
  const toggleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <View style={styles.container}>
      {isClick && (
        <View>
          <MaterialCommunityIcons />
        </View>
      )}
      <TouchableOpacity onPressOut={() => toggleClick()}>
        <Image source={images.menu} style={styles.img} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
