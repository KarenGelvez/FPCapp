import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export const TeachersPicker = ({onChange, value = 0}) => {
  const {teachersList} = useSelector((state) => state.user);
  return (
    <>
      <Text style={{width: '70%', alignSelf: 'center', margin: 10}}>
        Debe seleccionar el docente con quien está matriculado:
      </Text>
      <View style={styles.view}>
        <Picker
          style={styles.picker}
          selectedValue={value}
          onValueChange={(value) =>
            onChange((data) => {
              return {...data, uidTeacher: value};
            })
          }
          testID={'SelectTeacher'}
          mode={'dropdown'}>
          <Picker.Item label={'Seleccione: '} value={0} key={0} />
          {teachersList.map((teacher) => (
            <Picker.Item
              label={teacher.name}
              value={teacher.uid}
              key={teacher.uid}
            />
          ))}
        </Picker>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: '100%',
  },
  view: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    height: 43,
    width: '75%',
    margin: 5,
  },
});
