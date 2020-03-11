import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../styles';
import {Button, Layout, Input} from '@ui-kitten/components';
import {RootContext} from '../../context';
import {Header} from '../../components/Header/Header';

const DetailsScreen = ({navigation, route}) => {
  const {actions} = useContext(RootContext);
  console.log(route);
  return (
    <Layout>
      <Header />
      <Layout
        style={{
          paddingHorizontal: '7%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#bebebe',
            fontWeight: 'bold',
            fontSize: 18,
            paddingVertical: 20,
          }}>
          {route.params.path + '/' + route.params.repo}
        </Text>
      </Layout>
      <Layout style={{...styles.ph_15, ...styles.mv_15}}>
        <Input label="Email" placeholder="john.doe@example.com" disabled />
        <Input label="Email" placeholder="john.doe@example.com" disabled />
        <Input label="Email" placeholder="john.doe@example.com" disabled />
        <Input label="Email" placeholder="john.doe@example.com" disabled />
        <Input label="Email" placeholder="john.doe@example.com" disabled />
      </Layout>
    </Layout>
  );
};

export default DetailsScreen;
