import React, {useContext, useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from '../../styles';
import {Button, Layout, Input, Icon, Spinner} from '@ui-kitten/components';
import {RootContext} from '../../context';
import {
  Logout,
  GetProfiles,
  UpdateProfile,
} from '../../context/reducers/actions';
import {Header} from '../../components/Header/Header';
import {stringToUppercase} from '../../utils/stringoperation';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Toast from '../../components/Toast/Toast';

const ProfileScreen = ({navigation}) => {
  const {globalState, dispatch} = useContext(RootContext);

  const [editedField, setEditedField] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [toastHandler, setToastHandler] = useState({
    visible: false,
    message: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetProfiles(globalState.token)
      .then(res => {
        console.log(res);
        setProfileData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      setLoading(true);
      setProfileData({});
    };
  }, []);

  const handleLogout = () => {
    Logout().then(res => {
      dispatch(res);
    });
  };

  const handleSubmit = () => {
    UpdateProfile(profileData, globalState.token)
      .then(res => {
        setToastHandler({visible: true, message: res.message});
        setEditedField([]);
        navigation.goBack();
      })
      .catch(err => {
        // setToastHandler({visible: true, message: err.toString()});
      });
  };

  return (
    <ScrollView>
      <Header />
      <Toast visible={toastHandler.visible} message={toastHandler.message} />

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
          Profile
        </Text>
      </Layout>

      <Layout style={{...styles.ph_15, ...styles.pv_15, alignItems: 'center'}}>
        {loading ? (
          <Spinner size="giant" status="info" />
        ) : (
          <>
            <Image
              style={{width: 100, height: 100}}
              source={{
                uri:
                  'https://www.shareicon.net/data/2016/07/05/791219_man_512x512.png',
              }}
            />
            <Button style={styles.mv_15} size="tiny">
              Upload new Profile
            </Button>
            {Object.keys(profileData).map((field, i) => {
              return (
                i !== 6 && (
                  <Input
                    key={i}
                    value={profileData[field]}
                    onChangeText={value => {
                      let tmp = {...profileData};
                      tmp[field] = value;
                      setProfileData(tmp);
                    }}
                    style={styles.mv_15}
                    label={stringToUppercase(field) + ' - ' + i}
                    icon={editIcon}
                    disabled={!editedField.includes(i)}
                    onIconPress={() => {
                      console.log(i);
                      setEditedField([...editedField, i]);
                    }}
                  />
                )
              );
            })}
            <Button
              status="info"
              disabled={editedField.length === 0}
              onPress={() => handleSubmit()}
              style={styles.mv_15}>
              Update Data
            </Button>
          </>
        )}
      </Layout>

      {/* <Button onPress={handleLogout}>Logout</Button> */}
    </ScrollView>
  );
};
const editIcon = style => <Icon {...style} name="edit-outline" />;

export default ProfileScreen;
