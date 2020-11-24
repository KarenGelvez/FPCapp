import React, {useState} from 'react';
import {
  StyleSheet,
  Switch,
  View,
  Text,
  Modal,
  TouchableHighlight,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {keyTeachers} from '../actions/user.action';
import {changeUser} from '../actions/ui.action';
import {TextInputPaper} from './TextInputPaper';

export const SwitchUser = () => {
  const dispatch = useDispatch();
  dispatch(keyTeachers());
  const {userTeacher} = useSelector((state) => state.ui);
  const {key} = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [newKey, setnewKey] = useState('');
  const handleCheck = () => {
    if (key === newKey) {
      dispatch(changeUser(!userTeacher));
    } else {
      return Alert.alert(
        'Clave incorrecta',
        'La clave que ingresada es incorrecta',
      );
    }
  };
  return (
    <View style={styles.wrapper}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              Ingresar clave para docentes
            </Text>
            <TextInputPaper
              label={'Clave docentes'}
              onChange={(value) => setnewKey(value)}
              value={newKey}
            />
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#838383'}}
              onPress={() => {
                setModalVisible(!modalVisible);
                handleCheck();
              }}>
              <Text style={styles.textStyle}>Confirmar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <View style={styles.wrapperIcon}>
        <Icon name="people-outline" size={29} color="#000" />
        <Text style={styles.text}>Estudiante</Text>
      </View>
      <Switch
        trackColor={{false: '#dadada', true: '#dadada'}}
        thumbColor={'#003366'}
        onValueChange={(value) => {
          if (value) {
            setModalVisible(!modalVisible);
          } else {
            dispatch(changeUser(value));
          }
        }}
        value={userTeacher}
      />
      <View style={styles.wrapperIcon}>
        <Icon name="person-outline" size={29} color="#000" />
        <Text style={styles.text}>Docente</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: 50,
    width: '38%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  wrapperIcon: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
  },

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
