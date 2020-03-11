import React, {useContext, memo} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {styles} from '../../styles';
import {Button, Layout} from '@ui-kitten/components';
import {Header} from '../../components/Header/Header';
import {CardThree, CardFour} from 'react-native-card-ui';
import CustomCard from '../../components/CustomCard';
import {scale} from 'react-native-size-matters';
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
      <Layout style={{paddingHorizontal: scale(30)}}>
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

        {bkd.map((item, i) => (
          <CustomCard key={i} repo={item} />
        ))}
      </Layout>
    </ScrollView>
  );
};

export default memo(HomeScreen);
