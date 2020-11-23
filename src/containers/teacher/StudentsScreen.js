import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loading} from '../../actions/ui.action';
import {getStudentsFirestore} from '../../actions/user.action';
import {ItemStudent} from '../../components/ItemStudent';
import {Loading} from '../../components/Loading';

export const StudentsScreen = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(loading());
    dispatch(getStudentsFirestore(userData['uid']));
  }, []);
  const {studentsList, studentsVerifiedList} = useSelector(
    (state) => state.user,
  );
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Loading />
        <View style={styles.viewHead}>
          <Text style={styles.text}>Estudiantes por aceptar</Text>
        </View>
        {studentsList.length == 0 && (
          <View style={styles.viewAux}>
            <Text style={styles.textAux}>
              No hay estudiantes por el momento
            </Text>
          </View>
        )}
        {studentsList.map(({name, photo, uid}) => (
          <ItemStudent
            name={name}
            photo={photo}
            uid={uid}
            key={uid}
            v={false}
            uidT={userData['uid']}
          />
        ))}
        <View style={styles.viewHead}>
          <Text style={styles.text}>Estudiantes aceptados</Text>
        </View>
        {studentsVerifiedList.length == 0 && (
          <View style={styles.viewAux}>
            <Text style={styles.textAux}>
              No hay estudiantes por el momento
            </Text>
          </View>
        )}
        {studentsVerifiedList.map(({name, photo, uid}) => (
          <ItemStudent name={name} photo={photo} uid={uid} key={uid} v={true} />
        ))}
        <ActivityIndicator />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  viewHead: {
    backgroundColor: '#ad3333',
    padding: 12,
    elevation: 20,
  },
  text: {
    fontSize: 17,
    color: '#fff',
  },
  viewAux: {
    backgroundColor: '#dadada',
    padding: 20,
    elevation: 20,
  },
  textAux: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center',
  },
});
