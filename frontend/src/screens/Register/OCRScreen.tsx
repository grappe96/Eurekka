import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { RegisterContext } from '../../contexts';

// OCR 인식 화면
const OCRScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    image: {
      marginVertical: 24,
      alignItems: 'center',
    },
    response: {
      marginVertical: 16,
      marginHorizontal: 8,
    },
  });

  // 촬영하거나 갤러리에서 고른 이미지 정보
  const [response, setResponse] = useState(null);

  // comeponentDidMount
  useEffect(() => {
    openCamera();
  }, []);

  // 유통기한 업데이트 메소드
  const { updateDate } = useContext(RegisterContext);

  // 카메라 권한 얻는 메소드
  const openCamera = () => {
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

  // 촬영하거나 갤러리에서 불러온 이미지 백으로 업로드
  const uploadProfileImage = async (image) => {
    const formData = new FormData();

    formData.append('updatedFile', {
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });

    try {
      const res = await axios.post(`http://10.0.2.2:8080/ocr`, formData, {
        headers: {
          'context-type': 'multipart/form-data',
        },
      });
      const result = res.data;
      if (result == 'TRY AGAIN')
        alert('글자를 파악하기 어렵습니다. 다시 시도해주세요.');
      else {
        const setDate = async () => {
          updateDate(result);
        };
        await setDate();
        navigation.navigate('Register');
      }
    } catch (err) {
      alert('유통기한을 가져올 수가 없습니다.');
    }
  };

  return (
    <SafeAreaView>
      <Button
        title="Take image"
        onPress={() =>
          ImagePicker.launchCamera(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            (response) => {
              setResponse(response);
              uploadProfileImage(response);
            }
          )
        }
      />

      <Button
        title="Select image"
        onPress={() =>
          ImagePicker.launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            (response) => {
              setResponse(response);
              uploadProfileImage(response);
            }
          )
        }
      />

      {response && (
        <View style={styles.image}>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: response.uri }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default OCRScreen;
