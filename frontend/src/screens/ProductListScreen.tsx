import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import ListItem, { Separator } from '../components/Product/ProductList';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { theme } from '../common/theme';
import { List } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import { Fonts } from '../Fonts';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import AsyncStoarage from '@react-native-community/async-storage';

const ProductListScreen = ({ navigation }) => {
  type product = {
    id: string;
    category: string;
    dday: number;
    name: string;
  };
  const [products, setResult] = useState<Array<product>>([]);

  const getProducts = async () => {
    axios
      .get(`http://10.0.2.2:8080/refrigerator/6093b8af7ae0dd0e126cd2e5`)
      .then(({ data }) => {
        setResult(data);
      })
      .catch((e) => {
        // API 호출이 실패한 경우
        console.error(e); // 에러표시
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const eatProduct = async (item) => {
    axios
      .post(
        `http://10.0.2.2:8080/refrigerator/eat`,
        { product: item },
        {
          headers: {
            jwt: AsyncStoarage.getItem('token'),
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
        `http://10.0.2.2:8080/refrigerator/adandon`,
        { product: item },
        {
          headers: {
            jwt: AsyncStoarage.getItem('token'),
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
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            {...item}
            onEatPress={() => eatProduct(item)}
            onAbandonPress={() => abandonProduct(item)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
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

export default ProductListScreen;
