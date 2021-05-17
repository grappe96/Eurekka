import React, { createContext, useState } from 'react';

const AlarmContext = createContext({
  hasAlarm: false,
  updateHasAlarm: (isAlarm) => {},
});

const AlarmProvider = ({ children }) => {
  const [hasAlarm, setHasAlarm] = useState(false);

  const updateHasAlarm = (isAlarm) => {
    setHasAlarm(isAlarm);
  };

  const value = { hasAlarm, updateHasAlarm };
  return (
    <AlarmContext.Provider value={value}>{children}</AlarmContext.Provider>
  );
};

export { AlarmContext, AlarmProvider };
