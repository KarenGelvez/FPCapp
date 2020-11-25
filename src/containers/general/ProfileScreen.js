import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {logoutEmail, logoutGoogle} from '../../actions/auth.action';
import {loading} from '../../actions/ui.action';
import {updateUser} from '../../actions/user.action';

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.auth);

  const [newData, setnewData] = useState({
    name: userData['name'],
    code: userData['code'],
  });
  const [editable, setEditable] = useState(false);
  const handleDataChanged = () => {
    if (editable) {
      const collection = userData['teacher'] ? 'teachers' : 'students';
      dispatch(
        updateUser(userData['uid'], collection, newData, userData['method']),
      );
      dispatch(loading(true));
    }
  };
  const logout = () => {
    if (userData['method'] === 'Email') {
      dispatch(logoutEmail());
    } else {
      dispatch(logoutGoogle());
    }
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.wrapperIcon}>
            {userData['photo'] != null ? (
              <Image
                source={{uri: userData['photo']}}
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: 'stretch',
                  borderRadius: 70,
                }}
              />
            ) : (
              <Icon name="person" size={80} color="#dadada" />
            )}
          </View>
          <Text style={styles.text}>
            {userData['teacher'] ? 'Docente' : 'Estudiante'}
          </Text>
          <View style={styles.wrapperData}>
            <View style={styles.viewLabel}>
              <Text style={styles.textLabel}>Nombre: </Text>
              <TextInput
                style={styles.input}
                value={String(newData['name'])}
                editable={editable}
                theme={{
                  colors: {
                    primary: '#003366',
                  },
                }}
                onChangeText={(val) => setnewData({...newData, name: val})}
              />
            </View>
            <View style={styles.viewLabel}>
              <Text style={styles.textLabel}>Código: </Text>
              <TextInput
                style={styles.input}
                value={String(newData['code'])}
                editable={editable}
                theme={{
                  colors: {
                    primary: '#003366',
                  },
                }}
                onChangeText={(val) => setnewData({...newData, code: val})}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setEditable(!editable);
                handleDataChanged();
              }}>
              <Text style={{fontSize: 15, color: '#fff'}}>
                {editable ? 'Guardar cambios' : 'Editar datos'}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonLogout} onPress={logout}>
            <Text style={{fontSize: 15, color: '#003366'}}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    height: '100%',
  },
  wrapper: {
    alignItems: 'center',
    marginTop: '15%',
  },
  wrapperIcon: {
    backgroundColor: '#003366',
    padding: 10,
    borderRadius: 80,
  },
  text: {
    fontSize: 17,
    margin: 5,
    fontWeight: 'bold',
  },
  wrapperData: {
    width: '100%',
    marginTop: '15%',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dadada',
  },
  input: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 8,
    color: 'red',
    height: 25,
    width: '90%',
  },
  viewLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textLabel: {
    fontSize: 16,
    paddingRight: 1,
  },
  button: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#003366',
    padding: 10,
    borderRadius: 50,
    margin: 5,
    width: '75%',
    alignSelf: 'center',
    marginTop: 10,
    alignItems: 'center',
  },
  buttonLogout: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#dadada',
    padding: 10,
    borderRadius: 50,
    margin: 5,
    width: '60%',
    alignSelf: 'center',
    marginTop: 25,
    alignItems: 'center',
  },
});
