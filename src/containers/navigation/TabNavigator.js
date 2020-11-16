import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileScreen} from '../general/ProfileScreen';
import {FPCScreen} from '../general/FPCScreen';
import {StudentsScreen} from '../teacher/StudentsScreen';
import {ProductsScreen} from '../teacher/ProductsScreen';
import {IngredientsScreen} from '../teacher/IngredientsScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TeacherTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#ad3333',
        inactiveTintColor: '#003366',
      }}
      initialRouteName="Estudiantes">
      <Tab.Screen
        name="Ingredientes"
        component={IngredientsScreen}
        options={{
          tabBarIcon: ({focused}) => {
            let colorIcon;
            focused ? (colorIcon = '#ad3333') : (colorIcon = '#003366');
            return <Icon name="apps-outline" size={25} color={colorIcon} />;
          },
        }}
      />
      <Tab.Screen
        name="Productos"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({focused}) => {
            let colorIcon;
            focused ? (colorIcon = '#ad3333') : (colorIcon = '#003366');
            return <Icon name="list" size={28} color={colorIcon} />;
          },
        }}
      />
      <Tab.Screen
        name="Formulación"
        component={FPCScreen}
        options={{
          tabBarIcon: ({focused}) => {
            let colorIcon;
            focused ? (colorIcon = '#ad3333') : (colorIcon = '#003366');
            return (
              <Icon name="document-text-outline" size={25} color={colorIcon} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Estudiantes"
        component={StudentsScreen}
        options={{
          tabBarIcon: ({focused}) => {
            let colorIcon;
            focused ? (colorIcon = '#ad3333') : (colorIcon = '#003366');
            return <Icon name="people-outline" size={29} color={colorIcon} />;
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => {
            let colorIcon;
            focused ? (colorIcon = '#ad3333') : (colorIcon = '#003366');
            return (
              <Icon name="person-circle-outline" size={27} color={colorIcon} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const StudentTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#ad3333',
        inactiveTintColor: '#003366',
      }}>
      <Tab.Screen
        name="Formulación"
        component={FPCScreen}
        options={{
          tabBarIcon: ({focused}) => {
            let colorIcon;
            focused ? (colorIcon = '#ad3333') : (colorIcon = '#003366');
            return (
              <Icon name="document-text-outline" size={25} color={colorIcon} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => {
            let colorIcon;
            focused ? (colorIcon = '#ad3333') : (colorIcon = '#003366');
            return (
              <Icon name="person-circle-outline" size={27} color={colorIcon} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export {TeacherTab, StudentTab};
