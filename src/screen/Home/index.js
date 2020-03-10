import React, {useContext, memo} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {styles} from '../../styles';
import {Button, Layout} from '@ui-kitten/components';
import {Header} from '../../components/Header/Header';
import GridButton from './GridButton';
const HomeScreen = ({navigation}) => {
  const bkd = [
    'Sertifikasi',
    'Kepangkatan',
    'Pendidikan',
    'Penelitian',
    'Pengajaran',
    'Pengabdian',
    'Pelatihan',
  ];
  return (
    <ScrollView>
      <Header />
      <Layout style={{paddingHorizontal: '15%'}}>
        <Text
          style={{
            color: '#bebebe',
            fontWeight: 'bold',
            fontSize: 24,
            paddingVertical: 20,
          }}>
          Welcome back,
          {'\n'}
          Dosen
        </Text>
      </Layout>
      <GridButton bkd={bkd} navigation={navigation} />
    </ScrollView>
  );
};

export default memo(HomeScreen);
