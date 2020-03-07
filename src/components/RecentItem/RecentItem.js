import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardHeader, Layout, Text} from '@ui-kitten/components';

const Header = () => <CardHeader title="Maldives" />;

export const RecentItem = () => (
  <Layout>
    <Card
      appearance="filled"
      style={styles.card}
      header={Header}
      status="primary">
      <Text>
        The Maldives, officially the Republic of Maldives, is a small country in
        South Asia, located in the Arabian Sea of the Indian Ocean. It lies
        southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from
        the Asian continent
      </Text>
    </Card>
  </Layout>
);

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
});
