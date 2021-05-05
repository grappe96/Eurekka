import React from 'react';
import styled from 'styled-components/native';
import { Image, View, StyleSheet } from 'react-native';
import { images } from '../common/images';
import { theme } from '../common/theme';

const HomeScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  });

  return (
    <View style={styles.container}>
      <Image source={images.openImg} style={styles.background} />
    </View>
  );
};

export default HomeScreen;
