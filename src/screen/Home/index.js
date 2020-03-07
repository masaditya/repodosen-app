import React, {useContext, memo} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../styles';
import {Button, Layout} from '@ui-kitten/components';
import {AuthContext} from '../../context';
import {RecentItem} from '../../components/RecentItem/RecentItem';
const HomeScreen = ({navigation}) => {
  const {state} = useContext(AuthContext);
  return (
    <Layout style={styles.container}>
      <Text> {state.userToken} </Text>
      <RecentItem />
      <Button onPress={() => navigation.navigate('Details')}>
        Move to Detail
      </Button>
    </Layout>
  );
};

export default HomeScreen;
