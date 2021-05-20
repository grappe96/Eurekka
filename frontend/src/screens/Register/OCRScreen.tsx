import axios from 'axios';
import React, { useState, useContext } from 'react';
import { View, SafeAreaView, StyleSheet, Image } from 'react-native';
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

  // 촬영하거나 갤러리에서 고른 이미지 데이터
  const [response, setResponse] = useState(null);

  // 유통기한 업데이트 메소드, 카메라 권한 변수
  const { updateDate, permission } = useContext(RegisterContext);

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
      .post(`http://eurekka.kr:5000/ocr`, formData, {
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
    <>
      {permission ? (
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
      ) : null}
    </>
  );
};

export default OCRScreen;
