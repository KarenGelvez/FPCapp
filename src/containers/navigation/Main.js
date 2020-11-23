import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logoutEmail} from '../../actions/auth.action';
import {AuthStack} from './StackNavigator';
import {StudentTab, TeacherTab} from './TabNavigator';

export const Main = () => {
  const {userData, method} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    if (method === 'Email') {
      dispatch(logoutEmail());
    } else {
      dispatch(logoutGoogle());
    }
  };
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
                  {
                    (Alert.alert(
                      'Acceso no autorizado',
                      'El docente aún no ha verificado tu registro',
                    ),
                    logout())
                  }

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
