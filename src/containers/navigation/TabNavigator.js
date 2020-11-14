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
    <Tab.Navigator>
      <Tab.Screen
        name="Ingredientes"
        component={IngredientsScreen}
        options={{
          tabBarIcon: () => {
            //return <Icon name="th" size={25} color="#000" />;
            return <Icon name="apps-outline" size={25} color="#000" />;
          },
        }}
      />
      <Tab.Screen
        name="Productos"
        component={ProductsScreen}
        options={{
          tabBarIcon: () => {
            //return <Icon name="th-list" size={25} color="#000" />;
            return <Icon name="list" size={28} color="#000" />;
          },
        }}
      />
      <Tab.Screen
        name="Formulacion"
        component={FPCScreen}
        options={{
          tabBarIcon: () => {
            //return <Icon name="list-alt" size={25} color="#000" />;
            return <Icon name="document-text-outline" size={25} color="#000" />;
          },
        }}
      />
      <Tab.Screen
        name="Estudiantes"
        component={StudentsScreen}
        options={{
          tabBarIcon: () => {
            //return <Icon name="users" size={25} color="#000" />;
            return <Icon name="people-outline" size={29} color="#000" />;
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => {
            //return <Icon name="user-circle-o" size={25} color="#000" />;
            return <Icon name="person-circle-outline" size={27} color="#000" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const StudentTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Formulacion"
        component={FPCScreen}
        options={{
          tabBarIcon: () => {
            //return <Icon name="list-alt" size={25} color="#000" />;
            return <Icon name="document-text-outline" size={25} color="#000" />;
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => {
            //return <Icon name="user-circle-o" size={25} color="#000" />;
            return <Icon name="person-circle-outline" size={27} color="#000" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export {TeacherTab, StudentTab};
