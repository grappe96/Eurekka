import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { images } from '../common/images';
import constant from '../common/Constant';
import { fonts } from '../common/fonts';

const IntroScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.textBackground}>
          <Text style={styles.text}>Touch to Start</Text>
        </View>
      </View>
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
  text: {
    color: '#ffffff',
    fontSize: 25,
    fontFamily: fonts.GMarket,
    zIndex: 99,
    padding: 10,
  },
  textBackground: {
    position: 'absolute',
    top: constant.height * 0.8,
    backgroundColor: '#55555555',
    borderRadius: 20,
    zIndex: 98,
  },
  textContainer: {
    alignItems: 'center',
    zIndex: 97,
  },
});
export default IntroScreen;
