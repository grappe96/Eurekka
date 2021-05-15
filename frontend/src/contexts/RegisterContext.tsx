import React, { createContext, useState } from 'react';

const RegisterContext = createContext({
  barcode: '',
  expirationDate: '',
  updateCode: (code) => {},
  updateDate: (date) => {},
});

const RegisterProvider = ({ children }) => {
  const [barcode, setCode] = useState('');
  const [expirationDate, setnDate] = useState('');

  const updateCode = (code) => {
    setCode(code);
  };
  const updateDate = (date) => {
    setnDate(date);
  };
  const value = { barcode, expirationDate, updateCode, updateDate };
  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterContext, RegisterProvider };
