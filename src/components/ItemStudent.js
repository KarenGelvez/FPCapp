import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {loading} from '../actions/ui.action';
import {verifiedUser} from '../actions/user.action';

export const ItemStudent = ({name, uid, photo, v, uidT}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.wrapperIcon}>
        {photo != null ? (
          <Image
            source={{uri: photo}}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'stretch',
              borderRadius: 40,
            }}
          />
        ) : (
          <Icon name="person" size={35} color="#d3d3d3" />
        )}
      </View>
      <Text style={styles.text}>{name}</Text>
      {!v && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(verifiedUser(uid, uidT));
            dispatch(loading(true));
          }}>
          <Text style={{fontSize: 15, color: '#fff'}}>Aceptar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#dadada',
    padding: 8,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    position: 'absolute',
    end: 0,
    flexDirection: 'row',
    backgroundColor: '#003366',
    padding: 10,
    borderRadius: 50,
    width: 100,
    justifyContent: 'center',
  },
});
