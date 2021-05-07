import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, ProductListScreen, RegisterScreen } from '../screens';
import Header from '../components/Common/Header';
import { View, StyleSheet } from 'react-native';
import BottomTab from './BottomTab';

const Stack = createStackNavigator();

// 인증 후 사용하는 모든 화면이 담긴 navigation stack
const MainStack = () => {
  const theme = useContext<{
    background: string;
    text: string;
  }>(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  // stack에 등록할 컴포넌트들
  return (
    <View style={styles.container}>
      <Stack.Navigator
        initialRouteName="Tab"
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#bacde6',
          },
          headerTitle: () => <Header navigation={navigation} />,
        })}
      >
        <Stack.Screen name="Tab" component={BottomTab} />
      </Stack.Navigator>
    </View>
  );
};

export default MainStack;
