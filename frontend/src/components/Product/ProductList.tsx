import React, { Component, useState } from 'react';
import styled from 'styled-components/native';
import { List } from 'react-native-paper';
import {
  Text,
  Image,
  Animated,
  StyleSheet,
  View,
  I18nManager,
} from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

export default class ProductList extends Component {
  _swipeableRow?: Swipeable;
  renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      this.close();
      alert(text);
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Image source={text} style={{ width: 40, height: 40 }} />
        </RectButton>
      </Animated.View>
    );
  };
  renderRightActions = (progress) => (
    <View
      style={{
        width: 192,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}
    >
      {this.renderRightAction(
        require('../../../assets/images/done/restaurant.png'),
        '#6D86DF',
        128,
        progress
      )}
      {this.renderRightAction(
        require('../../../assets/images/done/trash.png'),
        '#FB5C6F',
        64,
        progress
      )}
    </View>
  );
  updateRef = (ref: Swipeable) => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={this.renderRightActions}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
