import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Header } from '../components';
import { View, StyleSheet } from 'react-native';
import BottomTab from './BottomTab';
import {
  MyPageScreen,
  ProductDetailListScreen,
  BarcodeScreen,
  RecipeDetailScreen,
  OCRScreen,
} from '../screens';

const Stack = createStackNavigator();

// 인증 후 사용하는 화면이 쌓이는 navigation stack
const MainStack = () => {
  const theme =
    useContext<{
      background: string;
      text: string;
    }>(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  // main stack 안에 하단 Tab Navigation(Footer)
  return (
    <View style={styles.container}>
      <Stack.Navigator
        initialRouteName="Tab"
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#bacde6',
          },
          headerLeft: () => null,
          headerTitle: () => <Header navigation={navigation} />,
        })}
      >
        <Stack.Screen name="MyPage" component={MyPageScreen} />
        <Stack.Screen
          name="ProductDetailList"
          component={ProductDetailListScreen}
        />
        <Stack.Screen name="Barcode" component={BarcodeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="Tab" component={BottomTab} />
        <Stack.Screen name="OCR" component={OCRScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default MainStack;
