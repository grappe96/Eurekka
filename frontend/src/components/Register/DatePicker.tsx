import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { RegisterContext } from '../../contexts';
import CustomButton from '../Common/CustomButton';
import Constant from '../../common/Constant';

// 유통기한 날짜 고르는 모달
const DateModal = (props) => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: '#000000aa',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      alignItems: 'center',
    },
    modal: {
      borderRadius: 5,
      marginTop: Constant.height * 0.2,
      width: Constant.width * 0.8,
      height: 250,
      alignItems: 'center',
      backgroundColor: '#ffffff',
      padding: 10,
    },
    btnContainer: {
      alignItems: 'center',
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
            <View style={styles.btnContainer}>
              <CustomButton title="확인" onPress={() => clickButton()} />
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default DateModal;
