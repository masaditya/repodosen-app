import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../styles';
import {Button} from '@ui-kitten/components';

const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>

      <Button>Logout</Button>
    </View>
  );
};

export default DetailsScreen;
