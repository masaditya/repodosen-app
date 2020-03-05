import React from 'react';
import {View, Text} from 'react-native';
import {Layout, Spinner} from '@ui-kitten/components';
import {styles} from '../../styles';

const SplashScreen = () => {
  return (
    <Layout style={styles.container}>
      <Spinner size="giant" status="success" />
    </Layout>
  );
};

export default SplashScreen;
