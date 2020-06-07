import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../styles';
import {Button} from '@ui-kitten/components';
import {RootContext} from '../../context';
import {Logout} from '../../context/reducers/actions';

const ProfileScreen = ({navigation}) => {
  const {dispatch} = useContext(RootContext);

  const handleLogout = () => {
    Logout().then(res => {
      dispatch(res);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
};

export default ProfileScreen;
