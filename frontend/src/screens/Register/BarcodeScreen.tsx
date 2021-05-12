import React, { useEffect, useContext } from 'react';
import { View, SafeAreaView, PermissionsAndroid, Platform } from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';
import { RegisterContext } from '../../contexts';

function BarcodeScreen({ navigation }) {
  const { updateCode } = useContext(RegisterContext);

  const onBarcodeScan = async (qrvalue) => {
    // Called after te successful scanning of QRCode/Barcode
    await updateCode(qrvalue);
    navigation.navigate('Register');
  };

  useEffect(() => {
    openScanner();
  }, []);

  const openScanner = () => {
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
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
