import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../styles';
import {Layout, Input, Icon, Button} from '@ui-kitten/components';
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

  const {signIn} = useContext(AuthContext);

  return (
    <Layout style={{...styles.container, ...styles.ph_15}}>
      <Input
        placeholder="Place your Text"
        value={username}
        onChangeText={setUsername}
      />

      <Input
        style={styles.mv_15}
        value={password}
        placeholder="********"
        icon={renderIcon}
        secureTextEntry={secureTextEntry}
        onIconPress={onIconPress}
        onChangeText={setPassword}
      />

      <Button onPress={() => signIn({username, password})}>Login</Button>
    </Layout>
  );
};

export default LoginScreen;
