import React, { useState, useContext } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { RegisterContext } from '../../contexts';

// 유통기한 날짜 고르는 모달
const DateModal = (props) => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: '#00ff0005',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
    },
    modal: {
      width: 200,
      height: 100,
    },
  });

  const { updateDate } = useContext(RegisterContext);
  const [date, setDate] = useState(new Date());
  const changeDate = ({ date }) => {
    setDate(date);
  };

  const clickButton = async () => {
    await updateDate(date.toISOString().split('T')[0]);
    props.close();
  };

  return (
    <>
      {props.isModal ? (
        <View style={styles.container}>
          <View style={styles.modal}>
            <DatePicker
              date={date}
              onDateChange={(date) => changeDate({ date })}
              mode="date"
            />
            <Button title="확인" onPress={() => clickButton()} />
          </View>
        </View>
      ) : null}
    </>
  );
};

export default DateModal;
