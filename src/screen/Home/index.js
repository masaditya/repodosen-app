import React, {useContext, memo} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {styles} from '../../styles';
import {Button, Layout} from '@ui-kitten/components';
import {RootContext} from '../../context';
import {RecentItem} from '../../components/RecentItem/RecentItem';
import {Header} from '../../components/Header/Header';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
const HomeScreen = ({navigation}) => {
  const {globalState} = useContext(RootContext);
  const bkd = [
    'Sertifikasi',
    'Kepangkatan',
    'Pendidikan',
    'Penelitian',
    'Pengajaran',
    'Pengabdian',
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
      <Layout
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          // justifyContent: 'center',
        }}>
        {bkd.map((item, i) => (
          <Button
            key={i}
            status="info"
            style={{
              maxWidth: 220,
              width: '43%',
              height: '45%',
              margin: '2%',
              minHeight: 120,
              maxHeight: 150,
            }}
            onPress={() => navigation.navigate('Details')}>
            {item}
          </Button>
        ))}
      </Layout>
    </ScrollView>
  );
};

export default HomeScreen;
