import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {userAuthEmail} from '../../actions/auth.action';
import {TeachersPicker} from '../../components/TeachersPicker';
import {SwitchUser} from '../../components/SwitchUser';
import {TextInputPaper} from '../../components/TextInputPaper';
import {Loading} from '../../components/Loading';
import {getTeachersFirestore} from '../../actions/user.action';
import {loading} from '../../actions/ui.action';

export const RegisterScreen = ({navigation}) => {
  useEffect(() => {
    dispatch(getTeachersFirestore());
  }, []);
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    name: null,
    code: null,
    email: null,
    password: null,
    uidTeacher: null,
  });
  const {userTeacher} = useSelector((state) => state.ui);
  const handleSubmit = () => {
    console.log(data.uidTeacher);
    if (
      userTeacher == false &&
      (data.uidTeacher == null || data.uidTeacher == '0')
    ) {
      Alert.alert(
        'Datos incompletos',
        `Debe seleccionar un docente`,
        [{text: 'Aceptar'}],
        {
          cancelable: true,
        },
      );
    } else if (data.name == null || data.name == '') {
      Alert.alert(
        'Datos incompletos',
        'Debe proporcionar un nombre',
        [{text: 'Aceptar'}],
        {
          cancelable: true,
        },
      );
    } else if (data.code == null || data.code == '') {
      Alert.alert(
        'Datos incompletos',
        'Debe proporcionar un código',
        [{text: 'Aceptar'}],
        {
          cancelable: true,
        },
      );
    } else if (data.email == null || data.email == '') {
      Alert.alert(
        'Datos incompletos',
        'Debe proporcionar un correo electrónico',
        [{text: 'Aceptar'}],
        {
          cancelable: true,
        },
      );
    } else if (data.password == null || data.password == '') {
      Alert.alert(
        'Datos incompletos',
        'Debe proporcionar una contraseña',
        [{text: 'Aceptar'}],
        {
          cancelable: true,
        },
      );
    } else {
      dispatch(loading(true));
      dispatch(userAuthEmail({...data, userTeacher}));
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

        <Text style={styles.text}>Registro</Text>
        {!userTeacher && (
          <TeachersPicker onChange={setdata} value={data['uidTeacher']} />
        )}

        <TextInputPaper
          label={'Nombre Completo'}
          onChange={(value) => setdata({...data, name: value})}
        />
        <TextInputPaper
          label={'Código'}
          onChange={(value) => setdata({...data, code: value})}
          keyboard="number-pad"
        />
        <TextInputPaper
          label={'Correo Electrónico'}
          onChange={(value) => setdata({...data, email: value})}
          keyboard="email-address"
        />
        <TextInputPaper
          label={'Contraseña'}
          onChange={(value) => setdata({...data, password: value})}
          secure={true}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={{fontSize: 15, color: '#fff'}}>Registrarse</Text>
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
    width: 130,
    height: 130,
    margin: 10,
    marginTop: '10%',
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
