import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screen/Login';
import SplashScreen from '../screen/Splash';
import {RootContext} from '../context';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const {globalState, dispatch} = useContext(RootContext);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    AsyncStorage.getItem('userToken')
      .then(result => {
        dispatch({type: 'RESTORE_TOKEN', token: result});
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (globalState.isLoading) {
    return <SplashScreen />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {!globalState.isSignout ? (
            <Stack.Screen name="SignIn" component={LoginScreen} />
          ) : (
            <Stack.Screen name="Main" component={MainStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default RootNavigation;
