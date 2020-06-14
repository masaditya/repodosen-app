import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screen/Login';
import SplashScreen from '../screen/Splash';
import {RootContext} from '../context';
import {RestoreToken} from '../context/reducers/actions';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const {globalState, dispatch} = useContext(RootContext);

  React.useEffect(() => {
    RestoreToken().then(res => {
      dispatch(res);
    });
  }, []);

  if (globalState.isLoading) {
    return <SplashScreen />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {globalState.token === null ? (
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
