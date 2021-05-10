import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  ProductListScreen,
  RegisterScreen,
  MyPageScreen,
} from '../screens';
import Footer from '../components/Common/Footer';

const Tab = createBottomTabNavigator();

// 하단 Tab Navigation(Footer)에 기본 메뉴 화면 담음
const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <Footer {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ProductList" component={ProductListScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;
