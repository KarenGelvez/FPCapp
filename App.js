import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {store} from './src/Store';
import {SplashScreen} from './src/containers/general/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Main} from './src/containers/navigation/Main';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          {loading ? <SplashScreen /> : <Main />}
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
