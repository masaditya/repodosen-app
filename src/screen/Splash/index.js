import React from 'react';
import {View, Text, Image} from 'react-native';
import {Layout, Spinner} from '@ui-kitten/components';
import {styles} from '../../styles';

const SplashScreen = () => {
  return (
    <Layout style={styles.container}>
      <Image
        style={{width: 200, height: 200, marginVertical: 50}}
        source={require('../../assets/splash.png')}
      />
      <Spinner size="giant" status="primary" />
    </Layout>
  );
};

export default SplashScreen;
