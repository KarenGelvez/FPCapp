import {Firestore} from '../firebase/Firebase';
import {types} from '../Types';
import {covertArrStudent, covertArrTeacher} from '../helpers/Obj2Arr';
import {getUser} from './auth.action';
import {loading} from './ui.action';

export const getTeacher = (teachers) => {
  return {
    type: types.getTeachers,
    payload: teachers,
  };
};

export const getStudents = (students) => {
  return {
    type: types.getStudents,
    payload: students,
  };
};

export const getStudentsVerified = (students) => {
  return {
    type: types.getStudentsVerified,
    payload: students,
  };
};

export const getKeyTeachers = (key) => {
  return {
    type: types.getKeyTeachers,
    payload: key,
  };
};

export const getTeachersFirestore = () => {
  return async (dispatch) => {
    await Firestore.collection('teachers')
      .get()
      .then(({docs}) => {
        const teachersArr = covertArrTeacher(docs);
        dispatch(getTeacher(teachersArr));
        dispatch(loading(false));
      });
  };
};

export const getStudentsFirestore = (uid) => {
  return async (dispatch) => {
    await Firestore.collection('students')
      .where('teacher', '==', uid)
      .get()
      .then(({docs}) => {
        const {student, studentVerified} = covertArrStudent(docs);
        dispatch(getStudents(student));
        dispatch(getStudentsVerified(studentVerified));
        dispatch(loading(false));
      });
  };
};

export const keyTeachers = () => {
  return async (dispatch) => {
    await Firestore.collection('id')
      .get()
      .then(({docs}) => {
        docs.map(({_data}) => dispatch(getKeyTeachers(_data['idTeachers'])));
      });
  };
};

export const updateUser = (uid, collection, newdata, method) => {
  return async (dispatch) => {
    await Firestore.collection(collection)
      .doc(uid)
      .update({
        name: newdata['name'],
        code: newdata['code'],
      })
      .then(() => dispatch(getUser(uid, collection, method)));
  };
};

export const verifiedUser = (uid, uidT) => {
  return async (dispatch) => {
    await Firestore.collection('students')
      .doc(uid)
      .update({
        verified: true,
      })
      .then(() => {
        dispatch(getStudentsFirestore(uidT));
      });
  };
};
