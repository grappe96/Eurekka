import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List } from 'react-native-paper';
import { theme } from '../common/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NotificationList = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      alignItems: 'center',
      flex: 1,
      padding: 25,
      justifyContent: 'center',
      alignContent: 'center',
    },
    item: {
      width: 300,
      height: 50,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      margin: 5,
    },
    icon: {
      marginTop: 5,
    },
    day: {
      marginTop: 5,
      color: '#000000',
    },
    text: {
      color: '#000000',
    },
  });

  const [refrigerId, setRefId] = useState<String>('');
  AsyncStorage.getItem('userInfo', (err, res) => {
    const user = JSON.parse(res);
    setRefId(user.refrigeratorId);
  });

  const [list, setList] = useState([]);
  const getNotifiList = () => {
    axios
      .get(`http://k4a404.p.ssafy.io:5050/alarmList/${refrigerId}`)
      .then(({ data }) => {
        if (data == '정보없음') {
          setList([]);
          return;
        }
        let tmp = [];
        for (const [key, value] of Object.entries(data)) {
          tmp.push(value);
        }
        setList(tmp);
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  const Alarm = ({ name, ingredient, dday }) => {
    if (dday < 0) {
      const day = dday * -1;
      return (
        <List.Item
          style={styles.item}
          title={name}
          onPress={() => {
            navigation.navigate('AlarmRecipeList', {
              ingredient: ingredient,
            });
          }}
          left={() => (
            <MaterialCommunityIcons
              style={styles.icon}
              name="alert-circle-outline"
              size={24}
              color="#ff8080"
            />
          )}
          right={() => <Text style={styles.day}>유통기한 {day}일 지남</Text>}
        />
      );
    } else
      return (
        <List.Item
          style={styles.item}
          title={name}
          onPress={() => {
            navigation.navigate('AlarmRecipeList', {
              ingredient: ingredient,
            });
          }}
          left={() => (
            <MaterialCommunityIcons
              style={styles.icon}
              name="alert-circle-outline"
              size={24}
              color="#ff8080"
            />
          )}
          right={() => <Text style={styles.day}>유통기한 {dday}일 남음</Text>}
        />
      );
  };

  const listItem = ({ item }) => <Alarm {...item} />;

  useEffect(() => {
    if (refrigerId.length > 0) getNotifiList();
  }, [refrigerId]);

  return (
    <View style={styles.container}>
      {list.length > 0 ? (
        <FlatList
          data={list}
          renderItem={listItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.text}>유통기한이 임박한 식품이 없습니다.</Text>
      )}
    </View>
  );
};

export default NotificationList;
