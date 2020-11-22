import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {LoginScreen} from '../auth/LoginScreen';
import {RegisterScreen} from '../auth/RegisterScreen';
import {Alert, TouchableOpacity} from 'react-native';
import {IngredientsScreen} from '../teacher/IngredientsScreen';
import {ProductsScreen} from '../teacher/ProductsScreen';
import {FPCScreen} from '../general/FPCScreen';
import {StudentsScreen} from '../teacher/StudentsScreen';
import {ProfileScreen} from '../general/ProfileScreen';

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

const TeacherStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#dadada',
        },
        headerTintColor: 'black',
        headerBackTitle: 'Back',
        headerRight: () => {
          return (
            <TouchableOpacity onPress={() => Alert.alert('Cerrando sesion...')}>
              <Icon
                name="log-out-outline"
                size={30}
                color="#000"
                style={{marginRight: 5}}
              />
            </TouchableOpacity>
          );
        },
      }}>
      <Stack.Screen name="Ingredientes" component={IngredientsScreen} />
      <Stack.Screen name="Productos" component={ProductsScreen} />
      <Stack.Screen name="Formulacion" component={FPCScreen} />
      <Stack.Screen name="Estudiantes" component={StudentsScreen} />
      <Stack.Screen name="Perfil" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const StudentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#dadada',
        },
        headerTintColor: 'black',
        headerBackTitle: 'Back',
        headerRight: () => {
          return (
            <TouchableOpacity onPress={() => Alert.alert('Cerrando sesion...')}>
              <Icon
                name="log-out-outline"
                size={30}
                color="#000"
                style={{marginRight: 5}}
              />
            </TouchableOpacity>
          );
        },
      }}>
      <Stack.Screen name="Formulacion" component={FPCScreen} />
      <Stack.Screen name="Perfil" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export {AuthStack, TeacherStack, StudentStack};
