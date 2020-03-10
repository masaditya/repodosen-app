import React from 'react';
import {Text, Layout, Button} from '@ui-kitten/components';
import {Header} from '../../components/Header/Header';

const RepoList = ({navigation}) => {
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
            fontSize: 24,
            paddingVertical: 20,
          }}>
          Penelitian
        </Text>

        <Button
          status="info"
          size="small"
          style={{height: 40, borderRadius: 50}}>
          + Add New
        </Button>
      </Layout>

      {bkd.map((item, key) => (
        <Button key={key}>Hello</Button>
      ))}
    </Layout>
  );
};

export default RepoList;
