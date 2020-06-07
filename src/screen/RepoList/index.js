import React from 'react';
import {Text, Layout, Button} from '@ui-kitten/components';
import {Header} from '../../components/Header/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardThree} from 'react-native-card-ui';
import {ScrollView} from 'react-native';

const RepoList = ({navigation, route}) => {
  const reposItems = [
    {title: 'Repository', last_edited: '20 May 2020'},
    {title: 'Repository', last_edited: '20 May 2020'},
    {title: 'Repository', last_edited: '20 May 2020'},
    {title: 'Repository', last_edited: '20 May 2020'},
    {title: 'Repository', last_edited: '20 May 2020'},
    {title: 'Repository', last_edited: '20 May 2020'},
    {title: 'Repository', last_edited: '20 May 2020'},
    {title: 'Repository', last_edited: '20 May 2020'},
    {title: 'Repository', last_edited: '20 May 2020'},
    {title: 'Repository', last_edited: '20 May 2020'},
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
          {route.params.repo}
        </Text>

        <Button
          onPress={() => navigation.navigate('AddRepo')}
          status="info"
          size="small"
          style={{height: 40, borderRadius: 50}}>
          + Add New
        </Button>
      </Layout>

      <Layout>
        {reposItems.map((item, key) => (
          <TouchableOpacity
            style={{marginVertical: -7}}
            key={key}
            onPress={() =>
              navigation.navigate('Details', {
                repo: item.title + (key + 1),
                path: route.params.repo,
              })
            }>
            <CardThree
              title={item.title + ' ' + (key + 1)}
              subTitle={'Last Edited : ' + item.last_edited}
              profile={{
                uri: 'https://octicons.github.com/img/og/repo.png',
              }}
            />
          </TouchableOpacity>
        ))}
      </Layout>
    </ScrollView>
  );
};

export default RepoList;
