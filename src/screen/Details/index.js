import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../styles';
import {Button, Layout, Input} from '@ui-kitten/components';
import {RootContext} from '../../context';
import {Header} from '../../components/Header/Header';
import {stringToUppercase} from '../../utils/stringoperation';
import {CardThree} from 'react-native-card-ui';
import {ScrollView} from 'react-native-gesture-handler';

const DetailsScreen = ({navigation, route}) => {
  const {actions} = useContext(RootContext);
  console.log(route);
  const repo = route.params.repo;
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
        {Object.keys(repo)
          
          .map((field, i) => {
            return (
              <CardThree
                key={i}
                title={stringToUppercase(field)}
                subTitle={repo[field].toString()}
                profile={{
                  uri: 'https://octicons.github.com/img/og/repo.png',
                }}
              />
            );
          })}
      </Layout>
    </ScrollView>
  );
};

export default DetailsScreen;
