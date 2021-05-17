import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { images } from '../common/images';
import constant from '../common/Constant';

const IntroScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Image source={images.introImg} style={styles.img} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: constant.height,
    resizeMode: 'cover',
  },
});
export default IntroScreen;
