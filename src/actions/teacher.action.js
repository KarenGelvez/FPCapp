import {useState} from 'react';
import {Firestore, Auth} from '../firebase/Firebase';
import {covertArrTeacher} from '../helpers/Obj2Arr';
import {types} from '../Types';

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
//console.log(data.docs[0]['_data'])
/* .then(({docs}) => {
    docs.map(({_data}) => console.log(_data));
  }); */
export const getTeacher = (teachers) => {
  return {
    type: types.getTeachers,
    payload: teachers,
  };
};
