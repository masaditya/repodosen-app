import React, {useState, useContext, useEffect} from 'react';
import {Text, View, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {
  Layout,
  Input,
  Button,
  Datepicker,
  NativeDateService,
  Icon,
} from '@ui-kitten/components';
import {styles} from '../../styles';
import {Header} from '../../components/Header/Header';
import {models} from '../../helper/models';
import {
  stringToLow,
  stringToUppercase,
  stringSplitSlash,
} from '../../utils/stringoperation';
import {ScrollView} from 'react-native-gesture-handler';
import {RootContext} from '../../context';
import {CreateData} from '../../context/reducers/actions';
import RNFS from 'react-native-fs';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Toast from '../../components/Toast/Toast';

const AddRepoScreen = ({route}) => {
  const {globalState, dispatch} = useContext(RootContext);
  const [inputText, setInputText] = useState({});
  const [fileList, setFileList] = useState([]);
  const [date, setDate] = React.useState(new Date());
  const formControl = models[stringToLow(route.params.repo)];

  const [loading, setLoading] = useState(false);

  const [toastHandler, setToastHandler] = useState({
    visible: false,
    message: '',
  });

  const navigation = useNavigation();
  const formatDateService = new NativeDateService('en', {format: 'YYYY-MM-DD'});

  const isFocus = useIsFocused();

  useEffect(() => {
    console.log('LOAD ADD');
    setInputText({});
    setFileList([]);
    setToastHandler({
      visible: false,
      message: '',
    });
  }, [route, isFocus]);

  const uploadFileRepoHandler = async index => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      let tmp = [...fileList];
      tmp[index] = {...res};

      setFileList([...tmp]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  // handle input text
  const handleChange = (field, value) => {
    setInputText({...inputText, [field]: value});
  };

  const handleSubmit = () => {
    setLoading(true);
    let formData = new FormData();

    // mengisi formData dengan text field
    Object.keys(inputText).forEach(field => {
      formData.append(field, inputText[field]);
    });

    // mengisi formData dengan file
    fileList.forEach(file => {
      formData.append('file', file);
    });

    CreateData(route.params.repo, formData, globalState.token)
      .then(res => {
        setToastHandler({visible: true, message: res.message});
        navigation.goBack();
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
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
          {route.params.repo}
        </Text>
      </Layout>
      <Layout style={styles.ph_15}>
        {Object.keys(formControl).map((field, i) => {
          switch (formControl[field]) {
            case 'text':
              return (
                <Input
                  disabled={loading}
                  key={i}
                  style={styles.mv_15}
                  label={stringToUppercase(field)}
                  onChangeText={value => handleChange(field, value)}
                />
              );
            case 'number':
              return (
                <Input
                  disabled={loading}
                  keyboardType="numeric"
                  key={i}
                  style={styles.mv_15}
                  label={stringToUppercase(field)}
                  onChangeText={value => handleChange(field, value)}
                />
              );
            case 'file':
              // setFileIndex(fileIndex + 1);
              return (
                <View key={i} style={styles.mv_15}>
                  <Button
                    disabled={loading}
                    status="basic"
                    onPress={() => uploadFileRepoHandler(i)}>
                    {'Upload ' + stringToUppercase(field)}
                  </Button>

                  <Text category="h6">
                    Selected file: {JSON.stringify(fileList[i])}
                  </Text>
                </View>
              );
            case 'date':
              return (
                <View key={i} style={styles.mv_15}>
                  <Datepicker
                    date={date}
                    disabled={loading}
                    dateService={formatDateService}
                    icon={CalendarIcon}
                    onSelect={nextDate => setDate(nextDate)}
                  />
                  <Text category="h6">
                    Selected date: {date.toDateString()}
                  </Text>
                </View>
              );
            default:
              return;
          }
        })}

        <Button
          disabled={loading}
          onPress={handleSubmit}
          style={styles.mv_15}
          status="info">
          Submit
        </Button>
      </Layout>
    </ScrollView>
  );
};

export default AddRepoScreen;

const CalendarIcon = style => <Icon {...style} name="calendar" />;
