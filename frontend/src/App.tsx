import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './common/theme';
import Navigation from './navigations';

// Root 역할을 하는 컴포넌트
const App = () => {
  // src/theme.tsx 적용, 상태바 숨김, Nagivation에 등록된 화면들 조회
  return (
    <ThemeProvider theme={theme}>
      <StatusBar hidden />
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
