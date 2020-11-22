import {GoogleSignin} from '@react-native-community/google-signin';
import {Auth, Firestore} from '../firebase/Firebase';
import {types} from '../Types';
import {removeUser as RU} from '../helpers/AsyncStorage';
import {covertDataUser} from '../helpers/Obj2Arr';
import {showModalRegister} from './ui.action';

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

export const userToRegister = (data) => {
  return {
    type: types.userToRegister,
    payload: data,
  };
};

export const getUser = (uid, collection) => {
  return (dispatch) => {
    Firestore.collection(collection)
      .doc(uid)
      .get()
      .then(({_data}) => {
        const user = covertDataUser(_data, collection);
        dispatch(userData(user));
      });
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
        })
        .catch((e) => console.log('ERROR REGISTER S: ' + e));
    }
    dispatch(logout());
  };
};
//setUserData(data);
export const loginGoogleTeacher = () => {
  return (dispatch) => {
    const GoogleSignIn = async () => {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = Auth.GoogleAuthProvider.credential(idToken);
      return Auth().signInWithCredential(googleCredential);
    };
    GoogleSignIn()
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          const newUser = {
            uid: res.user.uid,
            name: res.user.displayName,
            userTeacher: true,
          };
          dispatch(userToRegister(newUser));
          dispatch(showModalRegister(true));
        } else {
          dispatch(getUser(res.user.uid, 'teachers'));
        }
      })
      .catch((error) => console.log('ERROR => ' + error));
  };
};

export const loginGoogleStudent = () => {
  return (dispatch) => {
    const GoogleSignIn = async () => {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = Auth.GoogleAuthProvider.credential(idToken);
      return Auth().signInWithCredential(googleCredential);
    };
    GoogleSignIn()
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          const newUser = {
            uid: res.user.uid,
            name: res.user.displayName,
            userTeacher: false,
          };
          dispatch(userToRegister(newUser));
          dispatch(showModalRegister(true));
        } else {
          dispatch(getUser(res.user.uid, 'students'));
        }
      })
      .catch((error) => console.log('ERROR => ' + error));
  };
};

export const loginEmailTeacher = (data) => {
  console.log(Auth().currentUser.displayName);
  return (dispatch) => {
    Auth()
      .signInWithEmailAndPassword(data['email'], data['password'])
      .then((res) => {
        dispatch(getUser(res.user.uid, 'teachers'));
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          console.log(
            'no hay ningún usuario correspondiente al correo electrónico',
          );
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        if (error.code === 'auth/wrong-password') {
          console.log('la contraseña no es válida para el correo electrónico');
        }
        console.error(error);
      });
  };
};

export const loginEmailStudent = (data) => {
  return (dispatch) => {
    Auth()
      .signInWithEmailAndPassword(data['email'], data['password'])
      .then((res) => {
        dispatch(getUser(res.user.uid, 'students'));
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          console.log(
            'no hay ningún usuario correspondiente al correo electrónico',
          );
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        if (error.code === 'auth/wrong-password') {
          console.log('la contraseña no es válida para el correo electrónico');
        }
        console.error(error);
      });
  };
};

export const logoutGoogle = () => {
  return async (dispatch) => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut().then(() =>
        console.log('Sesion cerrada de google'),
      );
      //setUserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
};

export const logout = () => {
  return () => {
    Auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
};

export const removeUserAS = () => {
  return async (dispatch) => {
    await RU().then(() => dispatch(removeUser()));
  };
};
