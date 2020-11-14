import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Auth, Firestore} from '../../firebase/Firebase';
export const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Image
          source={require('../../../assets/images/Logo.png')}
          style={styles.image}
        />
        <Text style={styles.text}>Inicio de Sesión</Text>

        <GoogleSigninButton
          onPress={() =>
            GoogleSignIn()
              .then((result) => console.log('INICIO DE SESION' + result))
              .catch((error) => console.log('ERROR => ' + error))
          }
          style={{width: 220, height: 50, alignSelf: 'center', margin: 10}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
        />

        <View style={styles.or}>
          <View style={styles.separator} />
          <Text>o</Text>
          <View style={styles.separator} />
        </View>
        <TextInput
          style={styles.input}
          label="Correo Electrónico"
          mode="outlined"
          selectionColor="#003366"
          theme={{
            colors: {
              primary: '#003366',
            },
          }}
        />
        <TextInput
          style={styles.input}
          label="Contraseña"
          secureTextEntry={true}
          mode="outlined"
          theme={{
            colors: {
              primary: '#003366',
            },
          }}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Iniciando sesión...')}>
          <Text style={{fontSize: 15, color: '#fff'}}>Iniciar sesión</Text>
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
    margin: 50,
    marginTop: '25%',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
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
  },
  or: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#000000',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '30%',
    margin: 10,
  },
  input: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: '#fff',
    margin: 5,
    padding: 8,
    color: 'red',
  },
});
