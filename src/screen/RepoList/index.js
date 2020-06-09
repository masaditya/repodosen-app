import React, {useContext, useState} from 'react';
import {Text, Layout, Button, Card, Icon} from '@ui-kitten/components';
import {Header} from '../../components/Header/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardThree} from 'react-native-card-ui';
import {ScrollView, View, Alert} from 'react-native';
import {RootContext} from '../../context';
import {GetAllData, DeleteData} from '../../context/reducers/actions';
import {styles} from '../../styles';
import {stringToUppercase} from '../../utils/stringoperation';

const RepoList = ({navigation, route}) => {
  const {globalState, dispatch} = useContext(RootContext);
  const [repos, setRepos] = useState([]);

  React.useEffect(() => {
    GetAllData(route.params.repo, globalState.token).then(res => {
      setRepos(res.data);
    });
  }, [route.params.repo]);

  const handleDelete = repo => {
    console.log(repo[Object.keys(repo)[0]]);

    DeleteData(route.params.repo, repo[Object.keys(repo)[0]], globalState.token)
      .then(res => {
        console.log(res);
        Alert.alert(res.message);
        GetAllData(route.params.repo, globalState.token).then(res => {
          setRepos(res.data);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

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
          <Card
            key={key}
            style={{...styles.mv_15, ...styles.mh_15}}
            status="info"
            header={() => <HeaderCard item={item} navigation={navigation} />}>
            <View
              style={{
                ...styles.row,
                ...styles.space_around,
                ...styles.mv_15,
              }}>
              {/* <Button status="info" icon={EyeIcon}>
                  Show
                </Button> */}
              <Button status="warning" icon={EditIcon}>
                Update
              </Button>
              <Button
                onPress={() => handleDelete(item)}
                status="danger"
                icon={TrashIcon}>
                Delete
              </Button>
            </View>
          </Card>
        ))}
      </Layout>
    </ScrollView>
  );
};

const HeaderCard = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Details', {
          repo: item,
          path: item[Object.keys(item)[2]],
        })
      }
      style={{...styles.ph_15, ...styles.mv_15}}>
      <Text category="h6">
        {stringToUppercase(Object.keys(item)[2])} : {item[Object.keys(item)[2]]}
      </Text>
      <Text style={styles.color_gray} category="s1">
        {item[Object.keys(item)[3]]}
      </Text>
    </TouchableOpacity>
  );
};

const EditIcon = () => {
  return <Icon fill="#FFFFFF" name="edit-outline" />;
};

const TrashIcon = () => {
  return <Icon fill="#FFFFFF" name="trash-outline" />;
};

export default RepoList;

{
  /* <CardThree
              title={item[Object.keys(item)[2]]}
              subTitle={item[Object.keys(item)[3]]}
              profile={{
                uri: 'https://octicons.github.com/img/og/repo.png',
              }}
            /> */
}
