import React from 'react';
import {Text, Layout, Button} from '@ui-kitten/components';
import {Header} from '../../components/Header/Header';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {CardThree} from 'react-native-card-ui';
import {ScrollView} from 'react-native';

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

  const reposItems = [
    {title: 'repository', last_edited: '20 May 2020'},
    {title: 'repository', last_edited: '20 May 2020'},
    {title: 'repository', last_edited: '20 May 2020'},
    {title: 'repository', last_edited: '20 May 2020'},
    {title: 'repository', last_edited: '20 May 2020'},
    {title: 'repository', last_edited: '20 May 2020'},
    {title: 'repository', last_edited: '20 May 2020'},
    {title: 'repository', last_edited: '20 May 2020'},
    {title: 'repository', last_edited: '20 May 2020'},
    {title: 'repository', last_edited: '20 May 2020'},
  ];

  return (
    <ScrollView stickyHeaderIndices={<Header />}>
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

      <Layout>
        {reposItems.map((item, key) => (
          <TouchableHighlight
            style={{marginVertical: -7}}
            key={key}
            onPress={() => console.log(key)}>
            <CardThree
              title={item.title + ' ' + (key + 1)}
              subTitle={'Last Edited : ' + item.last_edited}
              profile={{
                uri: 'https://octicons.github.com/img/og/repo.png',
              }}
            />
          </TouchableHighlight>
        ))}
      </Layout>
    </ScrollView>
  );
};

export default RepoList;
