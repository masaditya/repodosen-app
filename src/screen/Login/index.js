import React, {useContext, useState, useEffect} from 'react';
import {styles} from '../../styles';
import {Layout, Input, Icon, Button, Text} from '@ui-kitten/components';
import {RootContext} from '../../context';
import {Login} from '../../context/reducers/actions';
import Toast from '../../components/Toast/Toast';
import {LOGIN_SUCCESS} from '../../context/actionTypes';

const LoginScreen = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const [loading, setLoading] = useState(false);

  const [toastHandler, setToastHandler] = useState({
    visible: false,
    message: '',
  });

  useEffect(() => {
    setToastHandler({
      visible: false,
      message: '',
    });
    return () => {
      setToastHandler({
        visible: false,
        message: '',
      });
    };
  }, [toastHandler.visible]);

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = style => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
  );

  const handleSubmit = () => {
    setLoading(true);
    Login({usernameLogin: username, passwordLogin: password}).then(res => {
      dispatch(res);
      if (res.type === LOGIN_SUCCESS) {
        setToastHandler({
          visible: true,
          message: 'Login success, welcome back ' + username,
        });
      } else {
        setToastHandler({
          visible: true,
          message: 'Login failed',
        });
      }
      setLoading(false);
    });
  };

  const {dispatch} = useContext(RootContext);
  return (
    <Layout
      style={{
        paddingHorizontal: 35,
        flex: 1,
        justifyContent: 'center',
      }}>
      <Toast visible={toastHandler.visible} message={toastHandler.message} />
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
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        disabled={loading}
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
        disabled={loading}
      />

      <Button
        disabled={loading}
        size="large"
        style={{borderRadius: 50}}
        onPress={handleSubmit}>
        {loading ? 'Loading' : 'LOGIN'}
      </Button>
    </Layout>
  );
};

export default LoginScreen;
