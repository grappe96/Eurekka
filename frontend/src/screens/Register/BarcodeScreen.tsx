import React, { useState } from 'react';

import { View, SafeAreaView, PermissionsAndroid, Platform } from 'react-native';

import { CameraScreen } from 'react-native-camera-kit';

function BarcodeScreen({ navigation }) {
  const [qrvalue, setQrvalue] = useState('');

  const onBarcodeScan = (qrvalue) => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    navigation.navigate('Register', {
      code: qrvalue,
    });
  };

  const onOpneScanner = () => {
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue('');
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err');
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
    }
  };

  return (
    <SafeAreaView>
      <View>
        <CameraScreen
          scanBarcode
          onReadCode={(event) =>
            onBarcodeScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default BarcodeScreen;
