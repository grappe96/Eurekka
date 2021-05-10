import React from 'react';
import { images } from '../../common/images';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Header component
function Header({ navigation }) {
  // style
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      flex: 1,
    },
    icon: {
      flex: 1,
      alignSelf: 'center',
    },
    img: {
      width: '100%',
      height: 50,
      resizeMode: 'contain',
    },
    logo: {
      flex: 9,
    },
  });

  // 알림, 로고, 마이페이지
  return (
    <View style={styles.row}>
      <MaterialCommunityIcons
        style={styles.icon}
        name="bell-outline"
        size={32}
        color="#606dca"
      />
      <TouchableOpacity
        style={styles.logo}
        onPressOut={() => navigation.navigate('Home')}
      >
        <Image source={images.logoImg} style={styles.img} />
      </TouchableOpacity>
      <TouchableOpacity onPressOut={() => navigation.navigate('MyPage')}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="account-circle-outline"
          size={32}
          color="#606dca"
        />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
