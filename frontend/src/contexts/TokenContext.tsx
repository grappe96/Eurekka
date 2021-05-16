import React, { createContext, useState } from 'react';

const TokenContext = createContext({
  deviceToken: '',
  token: '',
  updateToken: (token) => {},
  updateDeviceToken: (token) => {},
});

const TokenProvider = ({ children }) => {
  const [deviceToken, setDeviceToken] = useState('');
  const [token, setToken] = useState('');

  const updateDeviceToken = (token) => {
    setDeviceToken(token);
  };

  const updateToken = (token) => {
    setToken(token);
  };

  const value = { deviceToken, updateDeviceToken, token, updateToken };
  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

export { TokenContext, TokenProvider };
