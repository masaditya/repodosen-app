import React, {useContext} from 'react';
import {styles} from '../../styles';
import {Layout, Input, Icon, Button, Text} from '@ui-kitten/components';
import {AuthContext} from '../../context';

const LoginScreen = () => {
  const [username, setUsername] = React.useState('');

  const [password, setPassword] = React.useState('');

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = style => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
  );

  const {authContext} = useContext(AuthContext);

  return (
    <Layout
      style={{
        paddingHorizontal: 35,
        flex: 1,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: '#bebebe',
          fontWeight: 'bold',
          fontSize: 48,
          lineHeight: 70,
          paddingRight: '30%',
          paddingVertical: '10%',
          overflow: 'visible',
        }}>
        Sign In
        {'\n'}
        To Getting
        {'\n'}
        Started
      </Text>

      <Input
        size="large"
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
      />

      <Input
        style={styles.mv_15}
        size="large"
        value={password}
        placeholder="Password"
        icon={renderIcon}
        secureTextEntry={secureTextEntry}
        onIconPress={onIconPress}
        onChangeText={setPassword}
      />

      <Button
        size="large"
        style={{borderRadius: 50}}
        onPress={() => authContext.signIn({username, password})}>
        LOGIN
      </Button>
    </Layout>
  );
};

export default LoginScreen;
