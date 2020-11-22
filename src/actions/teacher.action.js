import {useState} from 'react';
import {Firestore, Auth} from '../firebase/Firebase';
import {covertArrTeacher} from '../helpers/Obj2Arr';
import {types} from '../Types';

export const getTeacher = (teachers) => {
  return {
    type: types.getTeachers,
    payload: teachers,
  };
};

export const getKeyTeachers = (key) => {
  return {
    type: types.getKeyTeachers,
    payload: key,
  };
};

export const getTeachersFirestore = () => {
  return (dispatch) => {
    Firestore.collection('teachers')
      .get()
      .then(({docs}) => {
        const teachersArr = covertArrTeacher(docs);
        dispatch(getTeacher(teachersArr));
      });
  };
};

export const keyTeachers = () => {
  return (dispatch) => {
    Firestore.collection('id')
      .get()
      .then(({docs}) => {
        docs.map(({_data}) => dispatch(getKeyTeachers(_data['idTeachers'])));
      });
  };
};
