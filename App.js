import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {store} from './src/Store';
import {SplashScreen} from './src/containers/general/SplashScreen';
import {AuthStack} from './src/containers/navigation/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';

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
          {loading ? (
            <>
              <StatusBar barStyle="light-content" />
              <SplashScreen />
            </>
          ) : (
            <AuthStack />
          )}
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
