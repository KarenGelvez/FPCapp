import {GoogleSignin} from '@react-native-community/google-signin';
import {Auth, Firestore} from '../firebase/Firebase';
import {types} from '../Types';
import {removeUser as RU, setUserData as SU} from '../helpers/AsyncStorage';
import {covertDataUser} from '../helpers/Obj2Arr';
import {loading, showModalRegister} from './ui.action';
import {Alert} from 'react-native';

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

export const getUser = (uid, collection, method) => {
  return async (dispatch) => {
    await Firestore.collection(collection)
      .doc(uid)
      .get()
      .then(({_data}) => {
        const user = covertDataUser(_data, collection, method);
        dispatch(setUserAS(user));
        dispatch(loading(false));
      });
  };
};

export const userAuthEmail = (data) => {
  return async (dispatch) => {
    await Auth()
      .createUserWithEmailAndPassword(data['email'], data['password'])
      .then((res) => {
        console.log('Usuario creado e iniciado sesionn-');
        const newData = {...data, uid: res.user.uid, photo: null};
        dispatch(userRegister(newData));
      })
      .catch((error) => {
        dispatch(loading(false));
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Información', 'El correo electrónico ya está en uso');
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Información', 'El correo electrónico en inválido');
        }
        if (error.code === 'auth/weak-password') {
          Alert.alert(
            'Información',
            'Contraseña débil, debe tener mínimo 6 caracteres',
          );
        }
        console.error(error);
      });
  };
};

export const userRegister = (data) => {
  return async (dispatch) => {
    if (data['userTeacher']) {
      //TeacherRegister
      await Firestore.collection('teachers')
        .doc(data['uid'])
        .set({
          uid: data['uid'],
          name: data['name'],
          code: data['code'],
          photo: data['photo'],
        })
        .then((res) => {
          Alert.alert('Registro Exitoso', 'Ya puede iniciar sesión');
        });
    } else {
      //StudentRegister
      await Firestore.collection('students')
        .doc(data['uid'])
        .set({
          uid: data['uid'],
          name: data['name'],
          code: data['code'],
          teacher: data['uidTeacher'],
          verified: false,
          photo: data['photo'],
        })
        .then((res) => {
          Alert.alert(
            'Registro Exitoso',
            'Para iniciar sesión, debe esperar ser aceptado por el docente',
          );
        })
        .catch((e) => console.log('ERROR REGISTER S: ' + e));
    }
    dispatch(loading(false));
    dispatch(logoutEmail());
  };
};

export const loginGoogleTeacher = () => {
  return async (dispatch) => {
    dispatch(loading(true));
    const GoogleSignIn = async () => {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = Auth.GoogleAuthProvider.credential(idToken);
      return Auth().signInWithCredential(googleCredential);
    };
    await GoogleSignIn()
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          const newUser = {
            uid: res.user.uid,
            name: res.user.displayName,
            userTeacher: true,
            photo: res.user.photoURL,
          };
          dispatch(loading(false));
          dispatch(userToRegister(newUser));
          dispatch(showModalRegister(true));
        } else {
          dispatch(getUser(res.user.uid, 'teachers', 'Google'));
        }
      })
      .catch((error) => {
        dispatch(loading(false));
        console.log('ERROR => ' + error);
      });
  };
};

export const loginGoogleStudent = () => {
  return async (dispatch) => {
    dispatch(loading(true));
    const GoogleSignIn = async () => {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = Auth.GoogleAuthProvider.credential(idToken);
      return Auth().signInWithCredential(googleCredential);
    };
    await GoogleSignIn()
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          const newUser = {
            uid: res.user.uid,
            name: res.user.displayName,
            userTeacher: false,
            photo: res.user.photoURL,
          };
          dispatch(loading(false));
          dispatch(userToRegister(newUser));
          dispatch(showModalRegister(true));
        } else {
          dispatch(getUser(res.user.uid, 'students', 'Google'));
        }
      })
      .catch((error) => {
        dispatch(loading(false));
        console.log('ERROR => ' + error);
      });
  };
};

export const loginEmailTeacher = (data) => {
  return async (dispatch) => {
    dispatch(loading(true));
    await Auth()
      .signInWithEmailAndPassword(data['email'], data['password'])
      .then((res) => {
        dispatch(getUser(res.user.uid, 'teachers', 'Email'));
      })
      .catch((error) => {
        dispatch(loading(false));
        if (error.code === 'auth/user-not-found') {
          Alert.alert(
            'Información',
            'No hay ningún usuario correspondiente al correo electrónico',
          );
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Información', 'El correo electrónico es inválido');
        }

        if (error.code === 'auth/wrong-password') {
          Alert.alert('Información', 'Contraseña incorrecta');
        }
        console.error(error);
      });
  };
};

export const loginEmailStudent = (data) => {
  return async (dispatch) => {
    dispatch(loading(true));
    await Auth()
      .signInWithEmailAndPassword(data['email'], data['password'])
      .then((res) => {
        dispatch(getUser(res.user.uid, 'students', 'Email'));
      })
      .catch((error) => {
        dispatch(loading(false));
        if (error.code === 'auth/network-request-failed') {
          Alert.alert('Información', 'Ha ocurrido un problema en la red');
        }
        console.log('ERROR PROMISE');
        if (error.code === 'auth/user-not-found') {
          Alert.alert(
            'Información',
            'No hay ningún usuario correspondiente al correo electrónico',
          );
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Información', 'El correo electrónico es inválido');
        }

        if (error.code === 'auth/wrong-password') {
          Alert.alert('Información', 'Contraseña incorrecta');
        }
      });
  };
};

export const logoutGoogle = () => {
  return async (dispatch) => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut().then(() => dispatch(removeUserAS()));
    } catch (error) {
      console.error(error);
    }
  };
};

export const logoutEmail = () => {
  return async (dispatch) => {
    await Auth()
      .signOut()
      .then(() => dispatch(removeUserAS()));
  };
};

export const setUserAS = (data) => {
  return async (dispatch) => {
    await SU(data).then(() => dispatch(userData(data)));
  };
};

export const removeUserAS = () => {
  return async (dispatch) => {
    await RU().then(() => dispatch(removeUser()));
  };
};
