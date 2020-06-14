import React, {useContext} from 'react';
import {View, Text, Image, Linking} from 'react-native';
import {styles} from '../../styles';
import {Button, Layout, Input} from '@ui-kitten/components';
import {RootContext} from '../../context';
import {Header} from '../../components/Header/Header';
import {stringToUppercase} from '../../utils/stringoperation';
import {CardThree} from 'react-native-card-ui';
import {ScrollView} from 'react-native-gesture-handler';

const DetailsScreen = ({navigation, route}) => {
  const {actions} = useContext(RootContext);
  const repo = route.params.repo;

  let fields = Object.keys(repo);
  fields.splice(0, 2);

  const renderView = (field, i) => {
    if (field.includes('file')) {
      let filename = repo[field]
        .split('.')
        .pop()
        .toLowerCase();
      if (filename === 'pdf') {
        return (
          <Layout>
            <Text style={{marginVertical: 10}}>
              {' '}
              {stringToUppercase(field)}{' '}
            </Text>
            <Button onPress={() => Linking.openURL(repo[field])}>
              Open File
            </Button>
          </Layout>
        );
      } else {
        return (
          <Layout
            style={{
              flex: 1,
              borderWidth: 1,
              padding: 5,
              borderColor: '#bebebe',
              borderRadius: 5,
              marginBottom: 10,
            }}>
            <Text> {stringToUppercase(field)} </Text>
            <Image
              style={{width: 300, height: 300}}
              resizeMode="contain"
              source={{uri: repo[field]}}
            />
          </Layout>
        );
      }
    } else {
      return (
        <CardThree
          title={stringToUppercase(field)}
          subTitle={repo[field].toString()}
          profile={{
            uri:
              'https://img.pngio.com/download-repository-demo-repository-png-512_512.png',
          }}
        />
      );
    }
  };

  return (
    <ScrollView>
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
            fontSize: 18,
            paddingVertical: 20,
          }}>
          {route.params.id}
        </Text>
      </Layout>
      <Layout style={{...styles.ph_15, ...styles.mv_15}}>
        <Text>Hem</Text>
        {fields.map((field, i) => {
          return <Layout key={i}>{renderView(field, i)}</Layout>;
        })}
      </Layout>
    </ScrollView>
  );
};

export default DetailsScreen;
