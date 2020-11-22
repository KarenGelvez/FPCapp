import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeUser, userData as userActive} from '../../actions/auth.action';
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
      {Object.keys(userData).length == 0 ? (
        <AuthStack />
      ) : (
        <>
          {userData['teacher'] ? (
            <TeacherTab />
          ) : (
            <>
              {userData['verified'] ? (
                <StudentTab />
              ) : (
                <>
                  {Alert.alert(
                    'Acceso no autorizado',
                    'El docente aún no ha verificado tu registro',
                  )}
                  <AuthStack />
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
