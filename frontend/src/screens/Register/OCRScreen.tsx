import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { RegisterContext } from '../../contexts';
import { CustomButton } from '../../components';
import constant from '../../common/Constant';

// OCR 인식 화면
const OCRScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    image: {
      marginVertical: 20,
      alignItems: 'center',
    },
    imgContainer: {
      height: constant.height * 0.4,
    },
    btnContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
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
      requestCameraPermission();
    }
  };

  // 촬영하거나 갤러리에서 불러온 이미지 백으로 업로드
  const uploadProfileImage = (image) => {
    if (image.didCancel == true) return;

    const formData = new FormData();

    formData.append('updatedFile', {
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });

    axios
      .post(`http://k4a404.p.ssafy.io:5000/ocr`, formData, {
        headers: {
          'context-type': 'multipart/form-data',
        },
      })
      .then(async (res) => {
        if (res.data == 'TRY AGAIN')
          alert('올바른 날짜 형식이 아닙니다. 다시 시도해주세요.');
        else {
          const setDate = () => {
            updateDate(res.data);
          };
          await setDate();
          navigation.navigate('Register');
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert('유통기한을 가져올 수가 없습니다.');
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.imgContainer}>
        {response && (
          <View style={styles.image}>
            <Image
              style={{ width: 200, height: 200 }}
              source={{ uri: response.uri }}
            />
          </View>
        )}
      </View>
      <View style={styles.btnContainer}>
        <CustomButton
          title="사진 촬영하기"
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
          margin={5}
        />

        <CustomButton
          title="사진첩에서 가져오기"
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
          margin={5}
        />
      </View>
    </SafeAreaView>
  );
};

export default OCRScreen;
