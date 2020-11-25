import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginEmailTeacher, loginEmailStudent} from '../../actions/auth.action';
import {getTeachersFirestore} from '../../actions/user.action';
import {ButtomGoogleSignIn} from '../../components/ButtomGoogleSignIn';
import {Separator} from '../../components/Separator';
import {SwitchUser} from '../../components/SwitchUser';
import {TextInputPaper} from '../../components/TextInputPaper';
import {Loading} from '../../components/Loading';
import {loading} from '../../actions/ui.action';

export const LoginScreen = ({navigation}) => {
  useEffect(() => {
    dispatch(getTeachersFirestore());
  }, []);
  const {userTeacher} = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    email: null,
    password: null,
  });
  const submitLoginEmail = () => {
    dispatch(loading(true));
    if (userTeacher) {
      dispatch(loginEmailTeacher(data));
    } else {
      dispatch(loginEmailStudent(data));
    }
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Loading />
        <Image
          source={require('../../../assets/images/Logo.png')}
          style={styles.image}
        />
        <SwitchUser />
        <Text style={styles.text}>Inicio de Sesión</Text>
        <ButtomGoogleSignIn />
        <Separator />
        <TextInputPaper
          label={'Correo Electrónico'}
          onChange={(value) => setdata({...data, email: value})}
          value={String(data['email'])}
        />
        <TextInputPaper
          label={'Contraseña'}
          onChange={(value) => setdata({...data, password: value})}
          value={String(data['password'])}
          secure={true}
        />
        <TouchableOpacity style={styles.button} onPress={submitLoginEmail}>
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
