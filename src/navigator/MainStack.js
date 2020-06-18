import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screen/Home';
import DetailsScreen from '../screen/Details';
import RepoList from '../screen/RepoList';
import ProfileScreen from '../screen/Profile';
import AddRepoScreen from '../screen/AddRepo';
import UpdateRepoScreen from '../screen/UpdateRepo';
import {Menu} from '@ui-kitten/components';
import UpdatePasswordScreen from '../screen/UpdatePassword';

const Drawer = createDrawerNavigator();
const MainStack = () => {
  const optionsProps = {
    drawerLabel: () => null,
    title: null,
    drawerIcon: () => null,
  };

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="UpdatePassword" component={UpdatePasswordScreen} />
      <Drawer.Screen name="Repos" component={RepoList} options={optionsProps} />
      <Drawer.Screen
        name="Details"
        component={DetailsScreen}
        options={optionsProps}
      />
      <Drawer.Screen
        name="AddRepo"
        component={AddRepoScreen}
        options={optionsProps}
      />
      <Drawer.Screen
        name="UpdateRepo"
        component={UpdateRepoScreen}
        options={optionsProps}
      />
    </Drawer.Navigator>
  );
};

export default MainStack;
