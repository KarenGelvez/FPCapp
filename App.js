import React, {useEffect, useState} from 'react';
import {StatusBar, Text} from 'react-native';
import {SplashScreen} from './src/containers/SplashScreen';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading ? (
        <>
          <StatusBar barStyle="light-content" />
          <SplashScreen />
        </>
      ) : (
        <Text>¡Formulación de Productos Cárnicos!</Text>
      )}
    </>
  );
};

export default App;
