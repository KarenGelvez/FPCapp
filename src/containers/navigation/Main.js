import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {removeUserAS, userData as userActive} from '../../actions/auth.action';
import {getUserData} from '../../helpers/AsyncStorage';
import {AuthStack} from './StackNavigator';
import {StudentTab, TeacherTab} from './TabNavigator';

export const Main = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.auth);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const userData = await getUserData();
    dispatch(userActive(userData));
    console.log(userData);
  };
  //dispatch(removeUserAS());
  return (
    <>
      {userData === null ? (
        <AuthStack />
      ) : (
        <>{userData['teacher'] ? <TeacherTab /> : <StudentTab />}</>
      )}
    </>
  );
};
