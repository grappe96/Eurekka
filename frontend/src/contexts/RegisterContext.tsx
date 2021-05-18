import React, { createContext, useState } from 'react';

const RegisterContext = createContext({
  barcode: '',
  expirationDate: '',
  permission: false,
  updateCode: (code) => {},
  updateDate: (date) => {},
  updatePermission: (permission) => {},
});

const RegisterProvider = ({ children }) => {
  const [barcode, setCode] = useState('');
  const [expirationDate, setDate] = useState('');
  const [permission, setPermission] = useState(false);

  const updateCode = (code) => {
    setCode(code);
  };
  const updateDate = (date) => {
    setDate(date);
  };
  const updatePermission = (permission) => {
    setPermission(permission);
  };
  const value = {
    barcode,
    expirationDate,
    permission,
    updateCode,
    updateDate,
    updatePermission,
  };
  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterContext, RegisterProvider };
