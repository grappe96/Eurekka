import React, { useState, createContext } from 'react';

// 사용자 정보 저장할 Context
const UserContext = createContext({
  userInfo: {
    id: '',
    email: '',
    name: '',
    profileImg: '',
    refrigeratorId: {},
    abandoned: [],
    eaten: [],
    alarmCycle: 0,
  },
  updateInfo: ({
    id,
    email,
    name,
    profileImg,
    refrigeratorId,
    abandoned,
    eaten,
    alarmCycle,
  }) => {},
});

// UserContext가 가진 객체와 함수를 전달하는 Provider
const UserProvider = ({ children }) => {
  // 사용자 정보 저장할 변수
  const [userInfo, setUserInfo] = useState({
    id: '',
    email: '',
    name: '',
    profileImg: '',
    refrigeratorId: {},
    abandoned: [],
    eaten: [],
    alarmCycle: 0,
  });

  // setUserInfo로 user 수정하는 함수
  const updateInfo = ({
    id,
    email,
    name,
    profileImg,
    refrigeratorId,
    abandoned,
    eaten,
    alarmCycle,
  }) => {
    setUserInfo({
      id,
      email,
      name,
      profileImg,
      refrigeratorId,
      abandoned,
      eaten,
      alarmCycle,
    });
  };
  //provider에 담을 value
  const value = { userInfo, updateInfo };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
