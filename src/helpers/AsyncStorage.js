import AsyncStorage from '@react-native-async-storage/async-storage';

const setUserData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@storage_user', jsonValue);
  } catch (e) {
    console.log('AsyncStorage[ERROR_SETITEM]: ' + e);
  }
};

const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_user');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log('AsyncStorage[ERROR_GETITEM]: ' + e);
  }
};

const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('@storage_user');
  } catch (e) {
    console.log('AsyncStorage[ERROR_REMOVEUSER]: ' + e);
  }
};

export {setUserData, getUserData, removeUser};
