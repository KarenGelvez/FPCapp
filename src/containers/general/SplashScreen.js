import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUserAS} from '../../actions/auth.action';
import {getUserData} from '../../helpers/AsyncStorage';

export const SplashScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const userData = await getUserData();
    dispatch(setUserAS(userData));
  };
  return (
    <View style={styles.view}>
      <Image
        style={styles.logo}
        source={require('../../../assets/images/Logo.png')}
      />
      <Image
        style={styles.slogan}
        source={require('../../../assets/images/Slogan.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  logo: {
    alignSelf: 'center',
    height: 250,
    width: 250,
  },
  slogan: {
    alignSelf: 'center',
    bottom: 0,
    position: 'absolute',
    resizeMode: 'stretch',
    height: 80,
    width: '60%',
  },
});
