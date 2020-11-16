import React from 'react';
import {StyleSheet, Switch, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const SwitchUser = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperIcon}>
        <Icon name="people-outline" size={29} color="#000" />
        <Text style={styles.text}>Estudiante</Text>
      </View>
      <Switch
        trackColor={{false: '#dadada', true: '#dadada'}}
        thumbColor={'#003366'}
        onValueChange={(state) => console.log(state)}
        value={false}
      />
      <View style={styles.wrapperIcon}>
        <Icon name="person-outline" size={29} color="#000" />
        <Text style={styles.text}>Docente</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: 50,
    width: '38%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  wrapperIcon: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
  },
});
