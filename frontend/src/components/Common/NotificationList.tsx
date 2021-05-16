import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constant from '../../common/Constant';

const NotificationList = (props) => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: '#00ff0000',
      top: 55,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      alignItems: 'flex-start',
    },
    modal: {
      width: Constant.width * 0.5,
      height: Constant.height * 0.5,
      backgroundColor: '#ffffff',
      padding: 10,
    },
    alarm: {
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
      .get(`http://10.0.2.2:5050/alarmList/${refrigerId}`)
      .then(({ data }) => {
        const obj = JSON.stringify(data);
        setList(JSON.parse(obj));
        console.log(list);
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  const Alarm = (item) => {
    return (
      <View>
        <Text style={styles.alarm}>{item.name}</Text>
        <Text style={styles.alarm}>{item.dday}</Text>
      </View>
    );
  };
  const listItem = ({ item }) => <Alarm item={item} />;

  useEffect(() => {
    if (refrigerId.length > 0) getNotifiList();
  }, []);

  return (
    <>
      {props.isModal ? (
        <View style={styles.container}>
          <View style={styles.modal}>
            <FlatList
              data={list}
              renderItem={listItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      ) : null}
    </>
  );
};

export default NotificationList;
