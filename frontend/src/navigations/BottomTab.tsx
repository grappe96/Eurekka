import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  ProductListScreen,
  MyPageScreen,
  RecipeListScreen,
  RegisterScreen,
  ProductDetailListScreen,
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
      <Tab.Screen name="RecipeList" component={RecipeListScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
      <Tab.Screen
        name="ProductDetailList"
        component={ProductDetailListScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
