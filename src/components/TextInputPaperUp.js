import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

export const TextInputPaperUp = ({
  label,
  onChange,
  secure = false,
  type = 'none',
  keyboard = 'default',
  value = '',
}) => {
  return (
    <TextInput
      style={styles.input}
      label={label}
      secureTextEntry={secure}
      mode="outlined"
      theme={{
        colors: {
          primary: '#003366',
        },
      }}
      onChangeText={onChange}
      textContentType={type}
      keyboardType={keyboard}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: '#fff',
    padding: 8,
    color: 'red',
    height: 43,
  },
});
