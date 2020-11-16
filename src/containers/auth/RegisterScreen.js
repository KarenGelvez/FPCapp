import {GoogleSigninButton} from '@react-native-community/google-signin';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Separator} from '../../components/Separator';
import {SwitchUser} from '../../components/SwitchUser';
import {TextInputPaper} from '../../components/TextInputPaper';

export const RegisterScreen = ({navigation}) => {
  const handleChange = (value) => {
    console.log(value);
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Image
          source={require('../../../assets/images/Logo.png')}
          style={styles.image}
        />

        <SwitchUser />

        <Text style={styles.text}>Registro</Text>

        <GoogleSigninButton
          onPress={
            () => Alert.alert('Iniciando sesión...')
            /* GoogleSignIn()
              .then((result) => console.log('INICIO DE SESION' + result))
              .catch((error) => console.log('ERROR => ' + error)) */
          }
          style={{width: 220, height: 50, alignSelf: 'center', margin: 10}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
        />

        <Separator />

        <TextInputPaper label={'Correo Electrónico'} onChange={handleChange} />
        <TextInputPaper
          label={'Contraseña'}
          onChange={handleChange}
          secure={true}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Iniciando sesión...')}>
          {/* <Icon name="log-in-outline" size={25} color="#fff" /> */}
          <Text style={{fontSize: 15, color: '#fff'}}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.register}>¿Ya tienes cuenta? Inicia Sesión</Text>
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
    width: 110,
    height: 110,
    margin: 10,
    marginTop: '5%',
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
