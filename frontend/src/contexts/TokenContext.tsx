import React, { createContext, useState } from 'react';

const TokenContext = createContext({
  token: '',
  updateToken: (token) => {},
});

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const updateToken = (token) => {
    setToken(token);
  };

  const value = { token, updateToken };
  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

export { TokenContext, TokenProvider };
