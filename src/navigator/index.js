import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screen/Login';
import SplashScreen from '../screen/Splash';
import {RootContext} from '../context';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const {globalState, actions} = useContext(RootContext);

  React.useEffect(() => {
    actions.restore();
  }, []);

  if (globalState.isLoading) {
    return <SplashScreen />;
  } else {
    return (
      <NavigationContainer>
        {console.log('TOKEN : ' + globalState.userToken)}
        <Stack.Navigator headerMode="none">
          {globalState.userToken === null ? (
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
