import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useSelector} from 'react-redux';

export const CategoriesPicker = ({onChange, value}) => {
  const {categoriesList} = useSelector((state) => state.data);

  return (
    <>
      <Text style={{width: '70%', alignSelf: 'center', margin: 3}}>
        Seleccione la categoría:
      </Text>
      <View style={styles.view}>
        <Picker
          style={styles.picker}
          selectedValue={value}
          onValueChange={(value) =>
            onChange((data) => {
              return {...data, category: value};
            })
          }
          testID={'SelectCategory'}
          mode={'dropdown'}>
          <Picker.Item label={'Seleccione: '} value={0} key={0} />
          {categoriesList.map((cat) => (
            <Picker.Item label={cat.name} value={cat.id} key={cat.id} />
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
    margin: 3,
  },
});
