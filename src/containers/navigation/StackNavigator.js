import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../auth/LoginScreen';
import {RegisterScreen} from '../auth/RegisterScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, //Ocultar header en todas las pantallas
        headerStyle: {
          backgroundColor: '#dadada',
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        options={{headerShown: false}} //Ocultar header en una pantalla especifica
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export {AuthStack};
