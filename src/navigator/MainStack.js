import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screen/Home';
import DetailsScreen from '../screen/Details';

const Stack = createStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator headerMode="none  ">
      <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
      <Stack.Screen name="Details" component={DetailsScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainStack;
