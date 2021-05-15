import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { BarChart, Grid } from 'react-native-svg-charts';
import axios from 'axios';
import { Button } from 'react-native-paper';
import { images } from '../common/images';
import { theme } from '../common/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPageScreen = () => {
  const [token, setToken] = useState<String>('');
  AsyncStorage.getItem('token', (err, res) => {
    setToken(res);
  });

  type user = {
    id: string;
    email: string;
    name: string;
    profileImg: string;
    refrigeratorId: string;
    alarmCycle: number;
  };

  type cur = {
    curMonth: number;
    eatenCnt: number;
    eatenPercentage: number;
    abandonedCnt: number;
    abandonedPercentage: number;
  };

  type mon = {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
  };

  type category = {
    면류: Array<number>;
    제과제빵류: Array<number>;
    음료: Array<number>;
    절임류: Array<number>;
    유제품: Array<number>;
    건강식품: Array<number>;
    분말류: Array<number>;
    육류: Array<number>;
    양념류: Array<number>;
    수산물: Array<number>;
    과채류: Array<number>;
    주류: Array<number>;
    냉동식품: Array<number>;
    빙과류: Array<number>;
    기타: Array<number>;
  };
  const [userInfo, setResult] = useState<user>({
    id: '',
    email: '',
    name: '',
    profileImg: '',
    refrigeratorId: '',
    alarmCycle: 0,
  });

  const [curMonthChart, setCur] = useState<cur>({
    curMonth: 0,
    eatenCnt: 0,
    eatenPercentage: 0,
    abandonedCnt: 0,
    abandonedPercentage: 0,
  });

  const [monthlyChart, setMon] = useState<mon>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  });

  const [categoryChart, setCategory] = useState<category>({
    면류: [0, 0],
    제과제빵류: [0, 0],
    음료: [0, 0],
    절임류: [0, 0],
    유제품: [0, 0],
    건강식품: [0, 0],
    분말류: [0, 0],
    육류: [0, 0],
    양념류: [0, 0],
    수산물: [0, 0],
    과채류: [0, 0],
    주류: [0, 0],
    냉동식품: [0, 0],
    빙과류: [0, 0],
    기타: [0, 0],
  });

  const getUserInfo = async () => {
    await axios
      .get(`http://k4a404.p.ssafy.io:5000/user/info`, {
        headers: {
          'content-type': 'application/json',
          jwt: token,
        },
      })
      .then(({ data }) => {
        setResult(data);
      })
      .catch((err) => {
        alert('서버와 연결할 수 없습니다.');
      });
  };

  const getCurmonth = async () => {
    await axios
      .get(`http://k4a404.p.ssafy.io:5000/statistics/curmonth`, {
        headers: {
          'content-type': 'application/json',
          jwt: token,
        },
      })
      .then(({ data }) => {
        setCur(data);
      })
      .catch((err) => {
        alert('서버와 연결할 수 없습니다.');
      });
  };

  const getMonthly = async () => {
    await axios
      .get(`http://k4a404.p.ssafy.io:5000/statistics/monthly`, {
        headers: {
          'content-type': 'application/json',
          jwt: token,
        },
      })
      .then(({ data }) => {
        setMon(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getCategory = async () => {
    await axios
      .get(`http://k4a404.p.ssafy.io:5000/statistics/category`, {
        headers: {
          'content-type': 'application/json',
          jwt: token,
        },
      })
      .then(({ data }) => {
        setCategory(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    if (token.length != 0) {
      getUserInfo();
      getCurmonth();
      getMonthly();
      getCategory();
    }
  }, [token]);

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      alert('logout');
    } catch (e) {
      console.log(e);
    }
  };

  var pieData = [
    {
      name: '먹음',
      count: curMonthChart.eatenCnt,
      color: '#6D86DF',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: '버림',
      count: curMonthChart.abandonedCnt,
      color: '#FB5C6F',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  var lineData = {
    labels: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    datasets: [
      {
        data: [
          monthlyChart[1],
          monthlyChart[2],
          monthlyChart[3],
          monthlyChart[4],
          monthlyChart[5],
          monthlyChart[6],
          monthlyChart[7],
          monthlyChart[8],
          monthlyChart[9],
          monthlyChart[10],
          monthlyChart[11],
          monthlyChart[12],
        ],
        strokeWidth: 1,
        backgroundColor: theme.background,
      },
    ],
  };

  var eatData = {
    labels: [
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
    ],
    datasets: [
      {
        data: [
          categoryChart.면류[0],
          categoryChart.제과제빵류[0],
          categoryChart.음료[0],
          categoryChart.절임류[0],
          categoryChart.유제품[0],
          categoryChart.건강식품[0],
          categoryChart.분말류[0],
          categoryChart.육류[0],
          categoryChart.양념류[0],
          categoryChart.수산물[0],
          categoryChart.과채류[0],
          categoryChart.주류[0],
          categoryChart.냉동식품[0],
          categoryChart.빙과류[0],
          categoryChart.기타[0],
        ],
        strokeWidth: 1,
        backgroundColor: theme.background,
      },
    ],
  };

  var abandonData = {
    labels: [
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
    ],
    datasets: [
      {
        data: [
          categoryChart.면류[1],
          categoryChart.제과제빵류[1],
          categoryChart.음료[1],
          categoryChart.절임류[1],
          categoryChart.유제품[1],
          categoryChart.건강식품[1],
          categoryChart.분말류[1],
          categoryChart.육류[1],
          categoryChart.양념류[1],
          categoryChart.수산물[1],
          categoryChart.과채류[1],
          categoryChart.주류[1],
          categoryChart.냉동식품[1],
          categoryChart.빙과류[1],
          categoryChart.기타[1],
        ],
        strokeWidth: 1,
        backgroundColor: theme.background,
      },
    ],
  };

  const GetImage = (data) => {
    var img;
    switch (data.image) {
      case 'img1':
        img = images.img1;
        break;
      case 'img2':
        img = images.img2;
        break;
      case 'img3':
        img = images.img3;
        break;
      case 'img4':
        img = images.img4;
        break;
      case 'img5':
        img = images.img5;
        break;
      case 'img6':
        img = images.img6;
        break;
    }
    return (
      <View>
        <Image source={img} style={{ width: 130, height: 130 }} />
      </View>
    );
  };

  const width = Dimensions.get('window').width;
  const [custom, setCustom] = useState<boolean>(true);

  const pressEat = () => {
    setCustom(true);
  };

  const pressAbandon = () => {
    setCustom(false);
  };

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <GetImage image={userInfo.profileImg} />
          <Text style={styles.name}>{userInfo.name}</Text>
          <Text style={styles.email}>{userInfo.email}</Text>
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.chartTitle}>
              {curMonthChart.curMonth}월 음식 소비량
            </Text>
          </View>
          <PieChart
            data={pieData}
            width={width}
            height={220}
            chartConfig={{
              backgroundColor: theme.background,
              backgroundGradientFrom: theme.background,
              backgroundGradientTo: theme.background,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="count"
            backgroundColor={theme.background}
            paddingLeft="15"
            absolute
          />
          <View style={styles.titleContainer}>
            <Text style={styles.chartTitle}>월별 버린 음식 개수</Text>
          </View>
          <LineChart
            data={lineData}
            width={width}
            height={220}
            chartConfig={{
              backgroundColor: theme.background,
              backgroundGradientFrom: theme.background,
              backgroundGradientTo: theme.background,
              color: (opacity = 1) => `rgba(96, 109, 202, ${opacity})`,
            }}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.chartTitle}>종류별 소비 음식 개수</Text>
          </View>
          <View style={styles.btnContainer}>
            {custom ? (
              <Button
                icon="silverware-fork-knife"
                mode="contained"
                style={styles.btn}
                color="#6D86DF"
                dark
                onPress={() => pressEat()}
              >
                먹음
              </Button>
            ) : (
              <Button
                icon="silverware-fork-knife"
                mode="outlined"
                style={styles.btn}
                color="#6D86DF"
                onPress={() => pressEat()}
              >
                먹음
              </Button>
            )}

            {custom ? (
              <Button
                icon="trash-can"
                mode="outlined"
                style={styles.btn}
                color="#FB5C6F"
                onPress={() => pressAbandon()}
              >
                버림
              </Button>
            ) : (
              <Button
                icon="trash-can"
                mode="contained"
                style={styles.btn}
                color="#FB5C6F"
                dark
                onPress={() => pressAbandon()}
              >
                버림
              </Button>
            )}
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            {custom ? (
              <LineChart
                data={eatData}
                width={900}
                height={220}
                chartConfig={{
                  backgroundColor: theme.background,
                  backgroundGradientFrom: theme.background,
                  backgroundGradientTo: theme.background,
                  color: (opacity = 1) => `rgba(109, 134, 223, ${opacity})`,
                }}
                bezier
              />
            ) : (
              <LineChart
                data={abandonData}
                width={900}
                height={220}
                chartConfig={{
                  backgroundColor: theme.background,
                  backgroundGradientFrom: theme.background,
                  backgroundGradientTo: theme.background,
                  color: (opacity = 1) => `rgba(251, 92, 111, ${opacity})`,
                }}
                bezier
              />
            )}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  profileContainer: {
    marginTop: 20,
    paddingBottom: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#606DCA',
    borderWidth: 2,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    margin: 5,
  },
  email: {
    fontSize: 15,
  },
  chartContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  chartTitle: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20,
  },
  btnContainer: {
    width: '80%',
    flexDirection: 'row',
    marginBottom: 20,
  },
  btn: {
    marginHorizontal: 3,
    width: '20%',
    height: '100%',
  },
});

export default MyPageScreen;
