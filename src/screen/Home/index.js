import React, {useContext, memo} from 'react';
import {Text, ScrollView} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {Header} from '../../components/Header/Header';
import CustomCard from '../../components/CustomCard';
import {scale} from 'react-native-size-matters';
const HomeScreen = ({navigation}) => {
  const bkd = [
    {
      title: 'Kepangkatan',
      desc:
        'berisi data status jabatan fungsional dosen, pangkat, golongan, dan juga angka kredit.',
    },
    {
      title: 'Pendidikan',
      desc:
        'berisi data status jabatan fungsional dosen, pangkat, golongan, dan juga angka kredit.',
    },
    {
      title: 'Penelitian',
      desc:
        'berisi data status jabatan fungsional dosen, pangkat, golongan, dan juga angka kredit.',
    },
    {
      title: 'Pengabdian',
      desc:
        'berisi data status jabatan fungsional dosen, pangkat, golongan, dan juga angka kredit.',
    },
    {
      title: 'Pengajaran',
      desc:
        'berisi data status jabatan fungsional dosen, pangkat, golongan, dan juga angka kredit.',
    },
    {
      title: 'Pelatihan',
      desc:
        'berisi data status jabatan fungsional dosen, pangkat, golongan, dan juga angka kredit.',
    },
    {
      title: 'Sertifikasi',
      desc:
        'berisi data status jabatan fungsional dosen, pangkat, golongan, dan juga angka kredit.',
    },
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
          <CustomCard key={i} title={item.title} desc={item.desc} />
        ))}
      </Layout>
    </ScrollView>
  );
};

export default memo(HomeScreen);
