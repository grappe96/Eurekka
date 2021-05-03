import React, { Component } from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import RNBarcode from 'react-native-barcode-zxing';
 
export default class EncodeApp extends Component<{}, any> {
 
  constructor(props) {
    super(props);
    
    this.onEncodePress = this.onEncodePress.bind(this);
 
    this.state = {
      imagesrc: require('../../assets/barcode_sample.png')
    }
  }
 
  onEncodePress() {
    const self = this;
    const options = {
      'type' : 'pdf417', // types
      'code' : '12345',
      'width' : 200,
      'height' : 200
    } 
    RNBarcode.encode(options, (error, blob) => {
      if (error) {
        console.error(error);
      } else {
        let baseImg = `data:image/png;base64,${blob}`;
        self.setState({
          imagesrc: baseImg
        })
      }
    })
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Encode"
          onPress={this.onEncodePress}
          color="#841584"></Button>
        <Image style={styles.barcode} ref='barcode' source={{ uri: this.state.imagesrc }}></Image>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  barcode: {
    width: 200,
    height: 200,
    backgroundColor: '#FF0000',
  }
});