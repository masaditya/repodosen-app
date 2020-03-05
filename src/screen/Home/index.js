import React, {useContext, memo} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../styles';
import {Button} from '@ui-kitten/components';
import {AuthContext} from '../../context';
const HomeScreen = ({navigation}) => {
  const {state} = useContext(AuthContext);
  console.log(state);
  return (
    <View style={styles.container}>
      <Text> {state.userToken} </Text>
      <Button onPress={() => navigation.navigate('Details')}>
        Move to Detail
      </Button>
    </View>
  );
};

export default HomeScreen;
