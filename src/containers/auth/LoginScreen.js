import {GoogleSigninButton} from '@react-native-community/google-signin';
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {userData} from '../../actions/auth.action';
import {Separator} from '../../components/Separator';
import {SwitchUser} from '../../components/SwitchUser';
import {TextInputPaper} from '../../components/TextInputPaper';
import {setUserData} from '../../helpers/AsyncStorage';
export const LoginScreen = ({navigation}) => {
  const {userTeacher} = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    email: null,
    password: null,
    teacher: userTeacher,
  });
  const submitLogin = () => {
    dispatch(userData(data));
    setUserData(data);
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Image
          source={require('../../../assets/images/Logo.png')}
          style={styles.image}
        />
        <SwitchUser />
        <Text style={styles.text}>Inicio de Sesión</Text>
        <GoogleSigninButton
          onPress={
            () => Alert.alert('Iniciando sesión con Google...')
            /* GoogleSignIn()
              .then((result) => console.log('INICIO DE SESION' + result))
              .catch((error) => console.log('ERROR => ' + error)) */
          }
          style={{width: 220, height: 50, alignSelf: 'center', margin: 10}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
        />
        <Separator />
        <TextInputPaper
          label={'Correo Electrónico'}
          onChange={(value) => setdata({...data, email: value})}
        />
        <TextInputPaper
          label={'Contraseña'}
          onChange={(value) => setdata({...data, password: value})}
          secure={true}
        />
        <TouchableOpacity style={styles.button} onPress={submitLogin}>
          <Text style={{fontSize: 15, color: '#fff'}}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.register}>¿Aún no tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
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
  wraper: {
    backgroundColor: 'green',
    justifyContent: 'space-between',
  },
  image: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    margin: 10,
    marginTop: '20%',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
    color: '#000',
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
  register: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});