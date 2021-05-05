import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import ProductList from '../components/Product/ProductList';
import { StyleSheet, Text, View, I18nManager, Image } from 'react-native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { theme } from '../theme';
import { List } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import { Fonts } from '../Fonts';

const Row = ({ item }) => {
  var img;
  switch (item.category) {
    case 'alcohol':
      img = require('../../assets/images/category/alcohol.png');
      break;
    case 'beverage':
      img = require('../../assets/images/category/beverage.png');
      break;
    case 'diary':
      img = require('../../assets/images/category/diary.png');
      break;
    case 'fresh':
      img = require('../../assets/images/category/fresh.png');
      break;
    case 'frozen':
      img = require('../../assets/images/category/frozen.png');
      break;
    case 'health':
      img = require('../../assets/images/category/health.png');
      break;
    case 'ices':
      img = require('../../assets/images/category/ices.png');
      break;
    case 'meat':
      img = require('../../assets/images/category/meat.png');
      break;
    case 'noodles':
      img = require('../../assets/images/category/noodles.png');
      break;
    case 'ocean':
      img = require('../../assets/images/category/ocean.png');
      break;
    case 'others':
      img = require('../../assets/images/category/others.png');
      break;
    case 'pickles':
      img = require('../../assets/images/category/pickles.png');
      break;
    case 'powder':
      img = require('../../assets/images/category/powder.png');
      break;
    case 'seasoning':
      img = require('../../assets/images/category/seasoning.png');
      break;
    case 'snack':
      img = require('../../assets/images/category/snack.png');
      break;
  }
  return (
    <View style={styles.rectButton}>
      <List.Item
        title={item.name}
        left={(props) => (
          <Image source={img} style={{ width: 40, height: 40 }} />
        )}
        right={(props) => <Text style={{ padding: 7 }}>{item.date}</Text>}
      />
    </View>
  );
};

const SwipeableRow = ({ item, index }) => {
  return (
    <ProductList>
      <Row item={item} />
    </ProductList>
  );
};

const ProductListScreen = ({ navigation }) => {
  // const [products, setResult] = useState<Object>([]);

  // const getProducts = async () => {
  //     axios
  //         .get("/refrigerator/{refrigerId}")
  //         .then(({ data }) => {
  //             setResult(data.data);
  //           })
  //           .catch(e => {  // API 호출이 실패한 경우
  //             console.error(e);  // 에러표시
  //           });
  // };

  // useEffect(() => {
  //     getProducts();
  // },([]))

  const products = [
    {
      id: 0,
      category: 'diary',
      name: '서울우유',
      date: 'D-5',
    },
    {
      id: 1,
      category: 'diary',
      name: '서울우유',
      date: 'D-7',
    },
    {
      id: 2,
      category: 'fresh',
      name: '대파',
      date: 'D-10',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>전체</Text>
      </View>
      <View style={styles.listItem}>
        <FlatList
          data={products}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) => (
            <SwipeableRow item={item} index={index} />
          )}
          keyExtractor={(item, index) => `message ${index}`}
        />
      </View>
    </View>
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
