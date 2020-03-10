import React from 'react';

import {Button, Layout} from '@ui-kitten/components';

const GridButton = ({bkd, navigation}) => {
  return (
    <Layout
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flex: 1,
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
          onPress={() => navigation.navigate('Repos')}>
          {item}
        </Button>
      ))}
    </Layout>
  );
};

export default GridButton;
