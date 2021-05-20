import React, { useContext } from 'react';
import { View, SafeAreaView, PermissionsAndroid, Platform } from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';
import { RegisterContext } from '../../contexts';

function BarcodeScreen({ navigation }) {
  // 바코드 업데이트 메소드, 카메라 권한 변수
  const { updateCode, permission } = useContext(RegisterContext);

  // 스캔한 바코드 값 가져오기
  const onBarcodeScan = async (qrvalue) => {
    await updateCode(qrvalue);
    navigation.navigate('Register');
  };

  return (
    <>
      {permission ? (
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
      ) : null}
    </>
  );
}

export default BarcodeScreen;
