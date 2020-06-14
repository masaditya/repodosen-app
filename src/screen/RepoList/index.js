import React, {useContext, useState} from 'react';
import {Text, Layout, Button, Card, Icon, Spinner} from '@ui-kitten/components';
import {Header} from '../../components/Header/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardThree} from 'react-native-card-ui';
import {ScrollView, View, Alert} from 'react-native';
import {RootContext} from '../../context';
import {GetAllData, DeleteData} from '../../context/reducers/actions';
import {styles} from '../../styles';
import {stringToUppercase} from '../../utils/stringoperation';
import {useIsFocused} from '@react-navigation/native';

const RepoList = ({navigation, route}) => {
  const {globalState, dispatch} = useContext(RootContext);
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);

  const isFocus = useIsFocused();

  React.useEffect(() => {
    GetAllData(route.params.repo, globalState.token).then(res => {
      setRepos(res.data);
      setLoading(false);
    });
    return () => {
      setLoading(true);
    };
  }, [route.params.repo, isFocus]);

  const handleDelete = repo => {
    DeleteData(route.params.repo, repo[Object.keys(repo)[0]], globalState.token)
      .then(res => {
        Alert.alert(res.message);
        setLoading(true);
        GetAllData(route.params.repo, globalState.token).then(res => {
          setRepos(res.data);
          setLoading(false);
        });
      })
      .catch(err => {
        Alert.alert(res.message);
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

      {loading ? (
        <View style={{...styles.container, paddingVertical: 55}}>
          <Spinner status="info" size="giant" />
        </View>
      ) : (
        <Layout style={styles.f1}>
          {repos.map((item, key) => (
            <Card
              key={key}
              style={{
                ...styles.mv_15,
                ...styles.mh_15,
                borderTopColor: '#74b9ff',
                borderTopWidth: 5,
                borderBottomColor: '#74b9ff',
                borderBottomWidth: 2,
              }}
              status="danger"
              header={() => <HeaderCard item={item} navigation={navigation} />}>
              <View
                style={{
                  ...styles.row,
                  ...styles.space_around,
                }}>
                <Button
                  onPress={() =>
                    navigation.navigate('UpdateRepo', {
                      repo: item,
                      id: item[Object.keys(item)[0]],
                      pathname: route.params.repo,
                    })
                  }
                  status="warning"
                  icon={EditIcon}>
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
      )}
    </ScrollView>
  );
};

const HeaderCard = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Details', {
          repo: item,
          id: item[Object.keys(item)[2]],
        })
      }
      style={{...styles.ph_15, ...styles.mv_15}}>
      <Text style={{fontWeight: 'bold'}} category="h6">
        {item[Object.keys(item)[2]]}
      </Text>
      <Text style={styles.color_gray} category="s1">
        {stringToUppercase(Object.keys(item)[3])} : {item[Object.keys(item)[3]]}
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
