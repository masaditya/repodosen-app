import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../styles';
import {Button} from '@ui-kitten/components';
import {RootContext} from '../../context';

const DetailsScreen = ({navigation}) => {
  const {actions} = useContext(RootContext);

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button onPress={() => actions.signOut()}>Logout</Button>
    </View>
  );
};

export default DetailsScreen;
