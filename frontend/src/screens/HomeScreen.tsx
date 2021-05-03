import React from 'react';
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';

const HomeScreen = () => {
  const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
  `;

  return (
    <Container>
      <Text style={{ fontSize: 30 }}>Home Screen</Text>
    </Container>
  );
};

export default HomeScreen;
