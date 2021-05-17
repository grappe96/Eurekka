import { registerRootComponent } from 'expo';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  await AsyncStorage.setItem('alarm', 'exist');
  console.log('Message handled in the background!', remoteMessage);
});

registerRootComponent(App);
