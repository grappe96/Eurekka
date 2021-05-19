import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = (props) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#09246D',
      borderRadius: 15,
      padding: 10,
    },
    text: {
      color: '#ffffff',
    },
  });
  return (
    <TouchableOpacity
      style={[styles.button, { marginHorizontal: props.margin }]}
      onPress={() => props.onPress()}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
