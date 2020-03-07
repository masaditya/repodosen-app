import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../styles';
import {Button} from '@ui-kitten/components';
import {AuthContext} from '../../context';

const DetailsScreen = ({navigation}) => {
  const {authContext} = useContext(AuthContext);
  console.log(authContext);
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>

      <Button onPress={() => authContext.signOut()}>Logout</Button>
    </View>
  );
};

export default DetailsScreen;
