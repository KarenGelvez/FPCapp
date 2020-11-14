import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

const Firestore = firestore();
const Auth = auth;
const AuthGoogle = GoogleSignin.configure({
  webClientId:
    '567236900306-pk1tsmc970rdrrnddd1g30g1duhb83uc.apps.googleusercontent.com',
});

export {Firestore, Auth, AuthGoogle};
