import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screen/Home';
import DetailsScreen from '../screen/Details';
import RepoList from '../screen/RepoList';
import ProfileScreen from '../screen/Profile';
import AddRepoScreen from '../screen/AddRepo';

const Drawer = createDrawerNavigator();
const MainStack = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen}></Drawer.Screen>
      <Drawer.Screen name="Repos" component={RepoList}></Drawer.Screen>
      <Drawer.Screen name="Details" component={DetailsScreen}></Drawer.Screen>
      <Drawer.Screen name="Profile" component={ProfileScreen}></Drawer.Screen>
      <Drawer.Screen name="AddRepo" component={AddRepoScreen}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default MainStack;
