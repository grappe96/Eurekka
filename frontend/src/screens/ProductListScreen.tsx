import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ProductList, { Separator } from '../components/Product/ProductList';
import { StyleSheet, SafeAreaView, FlatList, Text, View } from 'react-native';
import { theme } from '../common/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductListScreen = ({ navigation }) => {
  type product = {
    id: string;
    name: string;
    expirationDate: Date;
    ingredient: string;
    category: number;
    dday: number;
  };

  const [products, setResult] = useState<Array<product>>([]);
  const [token, setToken] = useState<String>('');
  const [refrigerId, setRefId] = useState<String>('');
  AsyncStorage.getItem('userInfo', (err, res) => {
    const user = JSON.parse(res);
    setRefId(user.refrigeratorId);
  });
  AsyncStorage.getItem('token', (err, res) => {
    setToken(res);
  });

  const getProducts = async () => {
    axios
      .get(`http://eurekka.kr:5000/refrigerator/${refrigerId}`)
      .then(({ data }) => {
        setResult(data);
      })
      .catch((e) => {
        // API 호출이 실패한 경우
        console.error(e); // 에러표시
      });
  };

  let flatListRef = useRef(null);
  const toTop = () => {
    if (flatListRef.current == null) return;
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };
  useEffect(() => {
    if (refrigerId.length != 0) getProducts();
  }, [refrigerId]);
  useEffect(() => {
    const reload = navigation.addListener('focus', () => {
      if (refrigerId.length != 0) {
        getProducts();
        toTop();
      }
    });
    return reload;
  }, [navigation, refrigerId]);

  const eatProduct = async (item) => {
    axios
      .post(
        `http://eurekka.kr:5000/refrigerator/eat`,
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
        `http://eurekka.kr:5000/refrigerator/abandon`,
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
      <View style={styles.listItem}>
        <View style={styles.listHead}>
          <Text style={styles.title}>전체</Text>
        </View>
        {products.length > 0 ? (
          <View style={styles.listItem}>
            <FlatList
              ref={(ref) => {
                flatListRef.current = ref;
              }}
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
              style={styles.list}
            />
          </View>
        ) : (
          <View style={styles.noListContainer}>
            <Text style={styles.noListText}>등록된 식품이 없습니다.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  listHead: {
    marginTop: 20,
    width: 370,
    height: 50,
    backgroundColor: '#0C276F',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#F0F0FA',
  },
  list: {
    width: 370,
  },
  listItem: {
    marginBottom: 60,
    alignItems: 'center',
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
  noListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noListText: {
    marginTop: 30,
    fontSize: 16,
    color: '#666666',
  },
});

export default ProductListScreen;
