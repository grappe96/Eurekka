import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { images } from '../../common/images';
import { theme } from '../../common/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { List } from 'react-native-paper';
import { RegisterContext } from '../../contexts';
import axios from 'axios';
import { DateModal } from '../../components';

// 식품 등록 화면
const RegisterScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      padding: 25,
      height: '100%',
    },
    img: {
      marginLeft: 15,
      marginBottom: 25,
      width: 180,
      height: 180,
    },
    row: {
      flexDirection: 'row',
    },
    textBox: {
      marginHorizontal: 20,
      width: 250,
    },
    text: {
      fontSize: 21,
      color: '#4d4d4d',
      marginTop: 10,
    },
    listText: {
      marginLeft: -15,
      marginTop: -10,
      marginBottom: -10,
    },
    input: {
      borderBottomColor: '#000000',
      borderBottomWidth: 1,
      color: '#000000',
    },
    touch: {
      marginTop: 22,
    },
    icon: {
      marginTop: 11,
    },
  });

  // 등록 화면에서 공통으로 사용할 바코드, 유통기한 변수, 메소드
  const { barcode, expirationDate } = useContext(RegisterContext);

  // 순서대로 사진, 식품명, 품목, 유통기한
  const [img, setImg] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // 품목 Accordian 확장하는 변수, 메소드
  const [expanded, setExpanded] = useState<boolean>(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // 품목 이름 설정하는 메소드
  const getCategory = (item) => {
    setCategory(item.title);
    setExpanded(false);
  };

  // 품목명 리스트
  const list = [
    {
      id: 0,
      title: '면류',
    },
    {
      id: 1,
      title: '제과제빵류',
    },
    {
      id: 2,
      title: '음료',
    },
    {
      id: 3,
      title: '절임류',
    },
    {
      id: 4,
      title: '유제품',
    },
    {
      id: 5,
      title: '건강식품',
    },
    {
      id: 6,
      title: '분말류',
    },
    {
      id: 7,
      title: '육류',
    },
    {
      id: 8,
      title: '양념류',
    },
    {
      id: 9,
      title: '수산물',
    },
    {
      id: 10,
      title: '과채류',
    },
    {
      id: 11,
      title: '주류',
    },
    {
      id: 12,
      title: '냉동식품',
    },
    {
      id: 13,
      title: '빙과류',
    },
    {
      id: 14,
      title: '기타',
    },
  ];

  // 리스트에 담긴 항목 Accordian안에 담아 보여줌
  const listItem = ({ item }) => (
    <List.Item title={item.title} onPress={() => getCategory(item)} />
  );

  // 읽어온 바코드 값이 있을 때
  useEffect(() => {
    if (barcode.length > 0) {
      findDataByBarcode();
    } else {
      setName('');
      setDate('');
      setCategory('');
      setDate('');
      setImg('');
    }
  }, [barcode]);

  // 읽어온 유통기한 값이 있을 때
  useEffect(() => {
    if (expirationDate.length > 0) {
      setDate(expirationDate);
    } else {
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [expirationDate]);

  // 바코드 데이터 조회
  const findDataByBarcode = () => {
    axios
      .get(`http://10.0.2.2:8080/barcode`, {
        params: {
          code: barcode,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCategory(res.data.category);
        setDate(res.data.id.date.split('T')[0]);
        setImg(res.data.imgUrl);
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err.response);
        alert('스캔하신 바코드의 정보가 없습니다.');
      });
  };

  const [isModal, setModal] = useState<boolean>(false);
  const closeModal = () => {
    setModal(false);
  };

  return (
    <View style={styles.container}>
      {img.length > 0 ? (
        <Image source={{ uri: img }} style={styles.img} />
      ) : (
        <Image source={images.noImg} style={styles.img} />
      )}
      <View style={styles.row}>
        <View style={styles.textBox}>
          <Text style={styles.text}>상품명</Text>
          <TextInput style={styles.input} value={name}></TextInput>
        </View>
        <View>
          <TouchableOpacity
            style={styles.touch}
            onPressOut={() => {
              navigation.navigate('Barcode');
            }}
          >
            <MaterialCommunityIcons
              name="barcode-scan"
              size={36}
              color="#000000"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.textBox}>
          <List.Accordion
            title="품목"
            titleStyle={[styles.text, styles.listText]}
            expanded={expanded}
            onPress={() => toggleExpanded()}
          >
            <FlatList
              data={list}
              renderItem={listItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </List.Accordion>
          <TextInput
            style={styles.input}
            value={category}
            editable={false}
          ></TextInput>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.textBox}>
          <View style={styles.row}>
            <Text style={styles.text}>유통기한</Text>
            <TouchableOpacity
              style={styles.icon}
              onPressOut={() => {
                setModal(true);
              }}
            >
              <MaterialCommunityIcons
                name="calendar"
                size={28}
                color="#000000"
              />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            value={date}
            editable={false}
          ></TextInput>
        </View>
        <View>
          <TouchableOpacity
            style={styles.touch}
            onPressOut={() => {
              navigation.navigate('OCR');
            }}
          >
            <MaterialCommunityIcons name="camera" size={36} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      <DateModal isModal={isModal} close={closeModal} />
    </View>
  );
};

export default RegisterScreen;
