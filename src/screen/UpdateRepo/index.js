import React, {useState, useContext, useEffect} from 'react';
import {Text, View, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Layout, Input, Button, Datepicker, Icon, NativeDateService} from '@ui-kitten/components';
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
import {CreateData, UpdateData} from '../../context/reducers/actions';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Toast from '../../components/Toast/Toast';

const UpdateRepoScreen = ({route}) => {
  const {globalState, dispatch} = useContext(RootContext);

  const {repo, pathname, id} = route.params;
  const [inputText, setInputText] = useState(repo);
  const [fileList, setFileList] = useState([]);
  const [date, setDate] = React.useState(new Date());
  const formControl = models[stringToLow(pathname)];
  const [toastHandler, setToastHandler] = useState({
    visible: false,
    message: '',
  });
  const formatDateService = new NativeDateService('en', {format: 'YYYY-MM-DD'});
  const [loading, setLoading] = useState(false);

  const isFocus = useIsFocused();

  useEffect(() => {
    console.log('LOAD UPDATE');
    setInputText(repo);
    setToastHandler({
      visible: false,
      message: '',
    });
  }, [repo, isFocus]);

  const navigation = useNavigation();

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
        setToastHandler({
          visible: true,
          message: 'Canceled!',
        });
      } else {
        setToastHandler({
          visible: true,
          message: 'Unknown Error: ' + JSON.stringify(err),
        });
        throw err;
      }
    }
  };

  // handle input text
  const handleChange = (field, value) => {
    setInputText({...inputText, [field]: value});
  };

  const handleSubmit = () => {
    // console.log('SUBMIT CALLED');
    setLoading(true);
    let formData = new FormData();

    // mengisi formData dengan text field
    Object.keys(inputText).forEach(field => {
      if (!field.includes('file') && !field.includes('id_')) {
        formData.append(field, inputText[field]);
      }
    });

    // mengisi formData dengan file
    fileList.forEach(file => {
      if (file) {
        formData.append('file', file);
      }
    });

    UpdateData(pathname, id, formData, globalState.token)
      .then(res => {
        if (res.success) {
          setToastHandler({
            visible: true,
            message: res.message,
          });
          navigation.goBack();
        } else {
          setToastHandler({
            visible: true,
            message: res.message,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    setLoading(false);
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
          {pathname}
        </Text>
      </Layout>
      {/* <Text> {JSON.stringify(inputText)} </Text>
      <Input
        style={styles.mv_15}
        label={stringToUppercase(Object.keys(formControl)[0])}
        value={inputText[Object.keys(formControl)[0]]}
        onChangeText={value => handleChange(Object.keys(formControl)[0], value)}
      /> */}
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
                  value={inputText[field]}
                  onChangeText={value => handleChange(field, value)}
                />
              );
            case 'number':
              return (
                <Input
                  disabled={loading}
                  key={i}
                  keyboardType="numeric"
                  style={styles.mv_15}
                  label={stringToUppercase(field)}
                  value={inputText[field]}
                  onChangeText={value => handleChange(field, value)}
                />
              );
            case 'file':
              return (
                <View key={i} style={styles.mv_15}>
                  <Button
                    disabled={loading}
                    status="basic"
                    onPress={() => uploadFileRepoHandler(i)}>
                    {'Upload ' + stringToUppercase(field)}
                  </Button>
                  <Text category="h6">
                    Old file: {stringSplitSlash(repo[field])}
                    {'\n'}
                    Selected file: {JSON.stringify(fileList[i])}
                  </Text>
                </View>
              );
            case 'date':
              return (
                <View key={i} style={styles.mv_15}>
                  <Datepicker
                    disabled={loading}
                    icon={CalendarIcon}
                    date={date}
                    dateService={formatDateService}
                    onSelect={nextDate => setDate(nextDate)}
                  />
                  <Text category="h6">Selected date: {date.toISOString()}</Text>
                </View>
              );
            default:
              return;
          }
        })}
      </Layout>

      <Button
        disabled={loading}
        onPress={handleSubmit}
        style={styles.mv_15}
        status="info">
        Submit
      </Button>
    </ScrollView>
  );
};

export default UpdateRepoScreen;

const CalendarIcon = style => <Icon {...style} name="calendar" />;
