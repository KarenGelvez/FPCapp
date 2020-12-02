import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Alert,
} from 'react-native';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import {
  loginGoogleTeacher,
  loginGoogleStudent,
  userRegister,
} from '../actions/auth.action';
import {showModalRegister} from '../actions/ui.action';
import {useDispatch, useSelector} from 'react-redux';
import {TextInputPaper} from './TextInputPaper';
import {TeachersPicker} from './TeachersPicker';

export const ButtomGoogleSignIn = () => {
  const {userTeacher, showModalRegister: show} = useSelector(
    (state) => state.ui,
  );
  const {userToRegister} = useSelector((state) => state.auth);
  const [data, setData] = useState({
    code: '',
    uidTeacher: '',
  });
  const dispatch = useDispatch();
  const submitLoginGoogle = () => {
    if (userTeacher) {
      dispatch(loginGoogleTeacher());
    } else {
      dispatch(loginGoogleStudent());
    }
  };
  const handleNewRegister = () => {
    if (userTeacher) {
      if (data['code'] == '') {
        Alert.alert('Información', 'Debe proporcionar un código');
      } else {
        const newUser = {
          ...userToRegister,
          code: data['code'],
          uidTeacher: data['uidTeacher'],
          userTeacher: userTeacher,
        };
        dispatch(userRegister(newUser));
        dispatch(showModalRegister(!show));
      }
    } else {
      if (
        data['code'] == '' ||
        data['uidTeacher'] == '' ||
        data['uidTeacher'] == '0'
      ) {
        Alert.alert('Información', 'Debe completar los campos');
      } else {
        const newUser = {
          ...userToRegister,
          code: data['code'],
          uidTeacher: data['uidTeacher'],
          userTeacher: userTeacher,
        };
        dispatch(userRegister(newUser));
        dispatch(showModalRegister(!show));
      }
    }
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={show}
        onRequestClose={() => dispatch(showModalRegister(!show))}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              Por favor, complete lo siguiente para continuar con su registro
            </Text>
            {!userTeacher && (
              <TeachersPicker onChange={setData} value={data['uidTeacher']} />
            )}
            <TextInputPaper
              label={'Código'}
              onChange={(value) => setData({...data, code: value})}
              keyboard="number-pad"
            />
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#838383'}}
              onPress={() => {
                handleNewRegister();
              }}>
              <Text style={styles.textStyle}>Confirmar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <GoogleSigninButton
        onPress={() => submitLoginGoogle()}
        style={{width: 220, height: 50, alignSelf: 'center', margin: 10}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '80%',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: '#737373',
    width: '100%',
  },
});
