import React, {useState, useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import {Input, Layout, Icon, Button} from '@ui-kitten/components';
import {styles} from '../../styles';
import {ChangePassword} from '../../context/reducers/actions';
import {RootContext} from '../../context';
import Toast from '../../components/Toast/Toast';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const UpdatePasswordScreen = () => {
  const {globalState} = useContext(RootContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confimPassword, setConfimPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState({
    old: true,
    new: true,
    confirm: true,
  });
  const [toastHandler, setToastHandler] = useState({
    visible: false,
    message: '',
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    setOldPassword('');
    setNewPassword('');
    setConfimPassword('');
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
  }, [isFocused]);

  const validator = () => {
    return newPassword === confimPassword;
  };

  const onIconPress = type => {
    setSecureTextEntry({...secureTextEntry, [type]: !secureTextEntry[type]});
  };

  const renderIcon = (type, style) => (
    <Icon {...style} name={secureTextEntry[type] ? 'eye-off' : 'eye'} />
  );

  const handleSubmit = () => {
    setLoading(true);
    if (validator()) {
      setError(false);
      ChangePassword(oldPassword, newPassword, globalState.token).then(res => {
        if (res.success) {
          setToastHandler({
            visible: true,
            message: res.message,
          });
          setTimeout(() => {
            navigation.navigate('Home');
          }, 500);
        } else {
          setToastHandler({
            visible: true,
            message: res.message,
          });
          setTimeout(() => {
            setToastHandler({
              visible: false,
              message: '',
            });
          }, 500);
        }
      });
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <Layout style={{...styles.container, ...styles.ph_15}}>
      <Text
        style={{
          color: '#bebebe',
          fontWeight: 'bold',
          fontSize: 24,
          paddingVertical: 20,
          textAlign: 'left',
        }}>
        Update Password
      </Text>
      <Toast visible={toastHandler.visible} message={toastHandler.message} />
      <Input
        style={styles.mv_15}
        onChangeText={e => setOldPassword(e)}
        value={oldPassword}
        label="Old Password"
        icon={style => renderIcon('old', style)}
        onIconPress={() => onIconPress('old')}
        secureTextEntry={secureTextEntry.old}
        disabled={loading}
      />
      <Input
        style={styles.mv_15}
        onChangeText={e => setNewPassword(e)}
        value={newPassword}
        label="New Password"
        icon={style => renderIcon('new', style)}
        onIconPress={() => onIconPress('new')}
        secureTextEntry={secureTextEntry.new}
        status={error ? 'danger' : 'basic'}
        caption={!error ? '' : 'Confirm password must be same as new Password'}
        disabled={loading}
      />
      <Input
        style={styles.mv_15}
        onChangeText={e => setConfimPassword(e)}
        value={confimPassword}
        label="Confirm New Password"
        icon={style => renderIcon('confirm', style)}
        onIconPress={() => onIconPress('confirm')}
        secureTextEntry={secureTextEntry.confirm}
        status={error ? 'danger' : 'basic'}
        caption={!error ? '' : 'Confirm password must be same as new Password'}
        disabled={loading}
      />

      <Button disabled={loading} onPress={handleSubmit}>
        {' '}
        Submit{' '}
      </Button>
    </Layout>
  );
};

export default UpdatePasswordScreen;
