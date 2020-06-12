import React, {useState, useContext, useEffect} from 'react';
import {Text, View, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Layout, Input, Button, Datepicker} from '@ui-kitten/components';
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
import {useNavigation} from '@react-navigation/native';
import Toast from '../../components/Toast/Toast';

const UpdateRepoScreen = ({route}) => {
  const {globalState, dispatch} = useContext(RootContext);

  const {repo, pathname, id} = route.params;
  console.log(id, pathname, repo);
  const [inputText, setInputText] = useState({...repo});
  const [fileList, setFileList] = useState([]);
  const [date, setDate] = React.useState(new Date());
  const formControl = models[stringToLow(pathname)];
  const [toastHandler, setToastHandler] = useState({
    visible: false,
    message: '',
  });

  useEffect(() => {
    setInputText({...repo});
    return () => {
    };
  }, [repo]);

  const navigation = useNavigation();

  const uploadFileRepoHandler = async index => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(res);
      let tmp = [...fileList];
      tmp[index] = {...res};

      setFileList([...tmp]);
      console.log(tmp);
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
    console.log(field, value);
    setInputText({...inputText, [field]: value});
  };

  const handleSubmit = () => {
    let formData = new FormData();

    // mengisi formData dengan text field
    Object.keys(inputText).forEach(field => {
      if (!field.includes('file') && !field.includes('id_')) {
        console.log(field, inputText[field]);
        formData.append(field, inputText[field]);
      }
    });

    // mengisi formData dengan file
    fileList.forEach(file => {
      if (file) {
        console.log(file);
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
          setInputText({});
          setFileList([]);
          navigation.goBack();
        } else {
          setToastHandler({
            visible: true,
            message: res.message,
          });
        }
      })
      .catch(err => {
        setToastHandler({
          visible: true,
          message: err,
        });
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
          {pathname}
        </Text>
      </Layout>
      <Layout style={styles.ph_15}>
        {Object.keys(formControl).map((field, i) => {
          switch (formControl[field]) {
            case 'text':
              return (
                <Input
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
                  key={i}
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
                    date={date}
                    onSelect={nextDate => setDate(nextDate)}
                  />
                  <Text category="h6">
                    Selected date: {date.toLocaleDateString()}
                  </Text>
                </View>
              );
            default:
              return;
          }
        })}

        <Button onPress={handleSubmit} style={styles.mv_15} status="info">
          Submit
        </Button>
      </Layout>
    </ScrollView>
  );
};

export default UpdateRepoScreen;
