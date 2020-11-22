import {Auth, Firestore} from '../firebase/Firebase';
import {types} from '../Types';
import {removeUser as RU} from '../helpers/AsyncStorage';

export const userData = (data) => {
  return {
    type: types.userActive,
    payload: data,
  };
};

export const removeUser = () => {
  return {
    type: types.removeUser,
  };
};

export const removeUserAS = () => {
  return async (dispatch) => {
    await RU().then(() => dispatch(removeUser()));
  };
};

export const userAuthEmail = (data) => {
  return (dispatch) => {
    Auth()
      .createUserWithEmailAndPassword(data['email'], data['password'])
      .then((res) => {
        console.log('Usuario creado e iniciado sesionn-');
        const newData = {...data, uid: res['user']['uid']};
        dispatch(userRegister(newData));
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('El Email ya esta en esu!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('el email es invalido');
        }
        if (error.code === 'auth/weak-password') {
          console.log('contrasenia debil');
        }
        console.error(error);
      });
  };
};

export const userRegister = (data) => {
  return (dispatch) => {
    if (data['userTeacher']) {
      //TeacherRegister
      Firestore.collection('teachers')
        .doc(data['uid'])
        .set({
          uid: data['uid'],
          name: data['name'],
          code: data['code'],
        })
        .then((res) => {
          console.log(res);
          console.log('Docente Registrado');
        });
    } else {
      //StudentRegister
      Firestore.collection('students')
        .doc(data['uid'])
        .set({
          uid: data['uid'],
          name: data['name'],
          code: data['code'],
          teacher: data['uidTeacher'],
          verified: false,
        })
        .then((res) => {
          console.log(res);
          console.log('Estudiante Registrado');
        });
    }
    dispatch(logout());
  };
};

export const logout = () => {
  return () => {
    Auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
};
