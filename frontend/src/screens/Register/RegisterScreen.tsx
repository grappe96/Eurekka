import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { images } from '../../common/images';
import { theme } from '../../common/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RegisterContext } from '../../contexts';
import axios from 'axios';
import { DateModal, CustomButton } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'sharingan-rn-modal-dropdown';

// 식품 등록 화면
const RegisterScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      height: '100%',
      marginTop: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      color: '#E8EEF7',
    },
    header: {
      width: 370,
      height: 50,
      backgroundColor: '#606DCA',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    body: {
      marginLeft: 5,
    },
    img: {
      alignSelf: 'center',
      width: 150,
      height: 150,
    },
    row: {
      flexDirection: 'row',
    },
    text: {
      fontSize: 20,
      color: '#4d4d4d',
      alignSelf: 'center',
      width: 80,
    },
    scroll: {
      maxHeight: 120,
      width: 200,
      marginHorizontal: 10,
    },
    listText: {
      marginTop: 20,
      fontSize: 20,
      color: '#4d4d4d',
      width: 80,
    },
    listBody: {
      flexDirection: 'row',
      height: 70,
    },
    input: {
      borderBottomColor: '#000000',
      borderBottomWidth: 1,
      color: '#000000',
      width: 200,
      marginHorizontal: 10,
    },
    dateInput: {
      borderBottomColor: '#000000',
      borderBottomWidth: 1,
      color: '#000000',
      width: 160,
      marginHorizontal: 10,
    },
    touch: {
      marginTop: 22,
      marginLeft: 10,
    },
    button: {
      marginTop: 20,
      alignSelf: 'flex-end',
    },
    date: {
      marginTop: 50,
    },
  });

  // 등록 화면에서 공통으로 사용할 바코드, 유통기한, 카메라 권한 변수, 메소드
  const {
    barcode,
    expirationDate,
    permission,
    updateCode,
    updateDate,
    updatePermission,
  } = useContext(RegisterContext);

  // 한국 시간 계산
  const setTime = () => {
    const cur = new Date();
    const utc = cur.getTime() + cur.getTimezoneOffset() * 60 * 1000;

    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_time = new Date(utc + KR_TIME_DIFF);

    return kr_time.toISOString().split('T')[0];
  };

  // 순서대로 사진, 식품명, 재료명, 품목, 유통기한
  const [img, setImg] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [ingredient, setIngredient] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [date, setDate] = useState<string>(setTime());

  // 품목명 리스트
  const list = [
    {
      value: 0,
      avatarSource: images.noodles,
      label: '면류',
    },
    {
      value: 1,
      avatarSource: images.snack,
      label: '제과제빵류',
    },
    {
      value: 2,
      avatarSource: images.beverage,
      label: '음료',
    },
    {
      value: 3,
      avatarSource: images.pickles,
      label: '절임류',
    },
    {
      value: 4,
      avatarSource: images.diary,
      label: '유제품',
    },
    {
      value: 5,
      avatarSource: images.health,
      label: '건강식품',
    },
    {
      value: 6,
      avatarSource: images.powder,
      label: '분말류',
    },
    {
      value: 7,
      avatarSource: images.meat,
      label: '육류',
    },
    {
      value: 8,
      avatarSource: images.seasoning,
      label: '양념류',
    },
    {
      value: 9,
      avatarSource: images.ocean,
      label: '수산물',
    },
    {
      value: 10,
      avatarSource: images.fresh,
      label: '과채류',
    },
    {
      value: 11,
      avatarSource: images.alcohol,
      label: '주류',
    },
    {
      value: 12,
      avatarSource: images.frozen,
      label: '냉동식품',
    },
    {
      value: 13,
      avatarSource: images.ices,
      label: '빙과류',
    },
    {
      value: 14,
      avatarSource: images.others,
      label: '기타',
    },
  ];

  // 품목 이름 설정하는 메소드
  const getCategory = (value) => {
    setCategoryId(value);
    switch (value) {
      case 0:
        setCategory('면류');
        break;
      case 1:
        setCategory('제과제빵류');
        break;
      case 2:
        setCategory('음료');
        break;
      case 3:
        setCategory('절임류');
        break;
      case 4:
        setCategory('유제품');
        break;
      case 5:
        setCategory('건강식품');
        break;
      case 6:
        setCategory('분말류');
        break;
      case 7:
        setCategory('육류');
        break;
      case 8:
        setCategory('양념류');
        break;
      case 9:
        setCategory('수산물');
        break;
      case 10:
        setCategory('과채류');
        break;
      case 11:
        setCategory('주류');
        break;
      case 12:
        setCategory('냉동식품');
        break;
      case 13:
        setCategory('빙과류');
        break;
      case 14:
        setCategory('기타');
        break;
    }
  };

  // 입력값 초기화
  const resetTextInput = () => {
    setName('');
    setIngredient('');
    setCategory('');
    setCategoryId(0);
    setDate(setTime());
    setImg('');
  };

  // 읽어온 바코드 값이 있을 때
  useEffect(() => {
    if (barcode.length > 0) {
      findDataByBarcode();
    } else {
      resetTextInput();
    }
  }, [barcode]);

  // 읽어온 유통기한 값이 있을 때
  useEffect(() => {
    if (expirationDate.length > 0) {
      setDate(expirationDate);
    } else {
      setDate(setTime());
    }
  }, [expirationDate]);

  // 바코드 데이터 조회
  const findDataByBarcode = () => {
    axios
      .get(`http://eurekka.kr:5000/barcode`, {
        params: {
          code: barcode,
        },
      })
      .then((res) => {
        setCategory(res.data.category);
        switch (res.data.category) {
          case '면류':
            setCategoryId(0);
            break;
          case '제과제빵류':
            setCategoryId(1);
            break;
          case '음료':
            setCategoryId(2);
            break;
          case '절임류':
            setCategoryId(3);
            break;
          case '유제품':
            setCategoryId(4);
            break;
          case '건강식품':
            setCategoryId(5);
            break;
          case '분말류':
            setCategoryId(6);
            break;
          case '육류':
            setCategoryId(7);
            break;
          case '양념류':
            setCategoryId(8);
            break;
          case '수산물':
            setCategoryId(9);
            break;
          case '과채류':
            setCategoryId(10);
            break;
          case '주류':
            setCategoryId(11);
            break;
          case '냉동식품':
            setCategoryId(12);
            break;
          case '빙과류':
            setCategoryId(13);
            break;
          case '기타':
            setCategoryId(14);
            break;
        }
        setImg(res.data.imgUrl);
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err.response);
        alert('스캔하신 바코드의 정보가 없습니다.');
        updateCode('');
        resetTextInput();
      });
  };

  // 날짜 선택 모달 control 하는 변수, 메소드
  const [isModal, setModal] = useState<boolean>(false);
  const closeModal = () => {
    setModal(false);
  };

  //상품 등록을 위한 냉장고 ID 가져옴
  const [refrigerId, setRefId] = useState<String>('');
  AsyncStorage.getItem('userInfo', (err, res) => {
    const user = JSON.parse(res);
    setRefId(user.refrigeratorId);
  });

  //상품 등록하는 메소드
  const registerProduct = () => {
    if (name.length == 0) {
      alert('상품명을 입력해주세요');
      return;
    } else if (ingredient.length == 0) {
      alert('재료명을 입력해주세요.');
      return;
    } else if (category.length == 0) {
      alert('품목을 선택해주세요.');
      return;
    } else if (date.length == 0) {
      alert('유통기한을 입력해주세요.');
      return;
    }

    axios
      .post(`http://eurekka.kr:5000/refrigerator/${refrigerId}`, {
        name: name,
        expirationDate: date,
        ingredient: ingredient,
        category: categoryId,
      })
      .then((res) => {
        alert('등록이 완료되었습니다.');
        updateCode('');
        updateDate('');
        resetTextInput();
      })
      .catch((err) => {
        console.log(err.response);
        alert('등록에 실패했습니다.');
      });
  };

  // // 탭 눌렀을 때 reload
  // useEffect(() => {
  //   const reload = navigation.addListener('focus', () => {
  //     resetTextInput();
  //   });
  //   return reload;
  // }, [navigation]);

  // 카메라 권한 요청
  const openCamera = () => {
    if (permission) return;

    // 안드로이드 일 때
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            updatePermission(true);
          } else {
            updatePermission(false);
            alert('카메라 권한이 거부되었습니다.');
          }
        } catch (err) {
          updatePermission(false);
          alert('카메라 권한 요청에 실패했습니다.');
          console.warn(err);
        }
      }
      requestCameraPermission();
    }
  };

  //카메라 권한 확인
  const checkPermission = async () => {
    await openCamera();
    return permission;
  };

  // 바코드 화면으로 이동
  const moveToBarcode = () => {
    if (!checkPermission()) return;
    navigation.navigate('Barcode');
  };

  // OCR 화면으로 이동
  const moveToOCR = () => {
    if (!checkPermission()) return;
    navigation.navigate('OCR');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>상품 등록</Text>
        </View>
        {img.length > 0 ? (
          <Image source={{ uri: img }} style={styles.img} />
        ) : (
          <Image source={images.noImg} style={styles.img} />
        )}
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.text}>상품명</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            ></TextInput>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => {
                moveToBarcode();
              }}
            >
              <MaterialCommunityIcons
                name="barcode-scan"
                size={32}
                color="#000000"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>재료명</Text>
            <TextInput
              style={styles.input}
              value={ingredient}
              onChangeText={setIngredient}
            ></TextInput>
          </View>
          <View style={styles.listBody}>
            <Text style={styles.listText}>품목명</Text>
            <View style={styles.scroll}>
              <Dropdown
                label=""
                data={list}
                enableSearch
                enableAvatar
                disableSort
                value={categoryId}
                onChange={getCategory}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>유통기한</Text>
            <TextInput
              style={styles.dateInput}
              value={date}
              editable={false}
            ></TextInput>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => {
                setModal(true);
              }}
            >
              <MaterialCommunityIcons
                name="calendar"
                size={32}
                color="#000000"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => {
                moveToOCR();
              }}
            >
              <MaterialCommunityIcons name="camera" size={32} color="#000000" />
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <CustomButton
              title="등록하기"
              onPress={() => {
                registerProduct();
              }}
            />
          </View>
        </View>
      </View>
      <DateModal isModal={isModal} close={closeModal} />
    </SafeAreaView>
  );
};

export default RegisterScreen;
