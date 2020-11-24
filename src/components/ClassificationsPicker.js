import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useSelector} from 'react-redux';

export const ClassificationsPicker = ({onChange, value = 0}) => {
  const {classificationsList} = useSelector((state) => state.data);

  return (
    <>
      <Text style={{width: '80%', alignSelf: 'center', margin: 10}}>
        Seleccione la clasificación a la cual pertenece el producto:
      </Text>
      <View style={styles.view}>
        <Picker
          style={styles.picker}
          selectedValue={value}
          onValueChange={(value) =>
            onChange((data) => {
              return {...data, clas: value};
            })
          }
          testID={'SelectClassification'}
          mode={'dropdown'}>
          <Picker.Item label={'Seleccione: '} value={0} key={0} />
          {classificationsList.map((clas) => (
            <Picker.Item label={clas.name} value={clas.id} key={clas.id} />
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
    width: '90%',
    margin: 5,
  },
});
