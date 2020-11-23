import React from 'react';
import {ActivityIndicator, View, Modal, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export const Loading = () => {
  const {loading} = useSelector((state) => state.ui);
  return (
    <Modal animationType="none" transparent={true} visible={loading}>
      <View style={styles.view}>
        <ActivityIndicator color={'#ad3333'} size="large" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    backgroundColor: '#00000040',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-around',
  },
});
