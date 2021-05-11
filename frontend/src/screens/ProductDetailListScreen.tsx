import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList, { Separator } from '../components/Product/ProductList';
import { StyleSheet, SafeAreaView, FlatList, Text, View } from 'react-native';
import { theme } from '../common/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailListScreen = ({ route, navigation }) => {
  var { category } = route.params;
  var categoryId = JSON.stringify(category);
  const categoryName = [
    '면류',
    '제과제빵류',
    '음료',
    '절임류',
    '유제품',
    '건강식품',
    '분말류',
    '육류',
    '양념류',
    '수산물',
    '과채류',
    '주류',
    '냉동식품',
    '빙과류',
    '기타',
  ];

  type product = {
    id: string;
    name: string;
    expirationDate: Date;
    ingredient: string;
    category: number;
    dday: number;
  };

  const [products, setResult] = useState<Array<product>>([]);

  const [refrigerId, setRefId] = useState<String>('');
  AsyncStorage.getItem('userInfo', (err, res) => {
    const user = JSON.parse(res);
    setRefId(user.refrigeratorId);
  });

  const getProducts = async () => {
    axios
      .get(`http://10.0.2.2:8080/refrigerator/${refrigerId}/${categoryId}`)
      .then(({ data }) => {
        setResult(data);
      })
      .catch((e) => {
        // API 호출이 실패한 경우
        console.error(e); // 에러표시
      });
  };

  useEffect(() => {
    if (refrigerId.length != 0 && categoryId.length != 0) {
      getProducts();
    }
  }, [refrigerId, categoryId]);

  const [token, setToken] = useState<String>('');
  AsyncStorage.getItem('token', (err, res) => {
    setToken(res);
  });

  const eatProduct = async (item) => {
    axios
      .post(
        `http://10.0.2.2:8080/refrigerator/eat`,
        {
          id: item.id,
          name: item.name,
          expirationDate: item.expirationDate,
          ingredient: item.ingredient,
          category: item.category,
          dday: 0,
        },
        {
          headers: {
            'content-type': 'application/json',
            jwt: token,
          },
        }
      )
      .then(getProducts)
      .catch(() => {
        alert('서버와 통신할 수 없습니다.');
      });
  };

  const abandonProduct = async (item) => {
    axios
      .post(
        `http://10.0.2.2:8080/refrigerator/abandon`,
        {
          id: item.id,
          name: item.name,
          expirationDate: item.expirationDate,
          ingredient: item.ingredient,
          category: item.category,
          dday: 0,
        },
        {
          headers: {
            'content-type': 'application/json',
            jwt: token,
          },
        }
      )
      .then(getProducts)
      .catch(() => {
        alert('서버와 통신할 수 없습니다.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{categoryName[categoryId]}</Text>
      </View>
      <View style={styles.listItem}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductList
              {...item}
              onEatPress={() => eatProduct(item)}
              onAbandonPress={() => abandonProduct(item)}
            />
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  titleBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  listItem: {
    flex: 10,
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: theme.background,
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
});

export default ProductDetailListScreen;
