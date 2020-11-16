import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Separator = () => {
  return (
    <View style={styles.or}>
      <View style={styles.separator} />
      <Text>o</Text>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
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
});
