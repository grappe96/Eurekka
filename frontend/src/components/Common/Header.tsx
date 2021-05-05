import React from 'react';
import { images } from '../../common/images';
import { Image } from 'react-native';

function Header() {
  return (
    <Image
      source={images.logoImg}
      style={{ width: '100%', height: 50, resizeMode: 'contain' }}
    />
  );
}

export default Header;
