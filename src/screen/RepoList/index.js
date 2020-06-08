import React, {useContext, useState} from 'react';
import {Text, Layout, Button} from '@ui-kitten/components';
import {Header} from '../../components/Header/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardThree} from 'react-native-card-ui';
import {ScrollView} from 'react-native';
import {RootContext} from '../../context';
import {GetAllData} from '../../context/reducers/actions';

const RepoList = ({navigation, route}) => {
  const {globalState, dispatch} = useContext(RootContext);
  const [repos, setRepos] = useState([]);

  React.useEffect(() => {
    GetAllData(route.params.repo, globalState.token).then(res => {
      setRepos(res.data);
      console.log(res.data[0]);
    });
  }, [route.params.repo]);

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
          onPress={() =>
            navigation.navigate('AddRepo', {repo: route.params.repo})
          }
          status="info"
          size="small"
          style={{height: 40, borderRadius: 50}}>
          + Add New
        </Button>
      </Layout>

      <Layout style={{flex: 1}}>
        {repos.map((item, key) => (
          <TouchableOpacity
            style={{marginVertical: -7}}
            key={key}
            onPress={() =>
              navigation.navigate('Details', {
                repo: item,
                path: item[Object.keys(item)[2]],
              })
            }>
            <CardThree
              title={item[Object.keys(item)[2]]}
              subTitle={item[Object.keys(item)[3]]}
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
