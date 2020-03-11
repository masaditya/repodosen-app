import React, {useContext, memo} from 'react';
import {Text, ScrollView} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {Header} from '../../components/Header/Header';
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
