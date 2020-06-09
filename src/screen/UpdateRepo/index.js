import React, {useState, useContext} from 'react';
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

const UpdateRepoScreen = ({route}) => {
  const {globalState, dispatch} = useContext(RootContext);

  const {repo, pathname, id} = route.params;

  const [inputText, setInputText] = useState(repo);
  const [fileList, setFileList] = useState([]);
  const [date, setDate] = React.useState(new Date());
  const formControl = models[stringToLow(pathname)];

  const navigation = useNavigation();

  const uploadFileRepoHandler = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(res);
      setFileList([...fileList, res]);
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
    console.log(field, value);
    setInputText({...inputText, [field]: value});
  };

  const handleSubmit = () => {
    let formData = new FormData();

    // mengisi formData dengan text field
    Object.keys(inputText).forEach(field => {
      formData.append(field, inputText[field]);
    });

    // mengisi formData dengan file
    fileList.forEach(file => {
      console.log(file);
      formData.append('file', file);
    });

    UpdateData(pathname, id, formData)
      .then(res => {
        console.log(res);
        navigation.goBack();
      })
      .catch(err => {
        Alert.alert(err);
      });
  };

  return (
    <ScrollView>
      <Header />
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
                  value={repo[field]}
                  onChangeText={value => handleChange(field, value)}
                />
              );
            case 'number':
              return (
                <Input
                  key={i}
                  style={styles.mv_15}
                  label={stringToUppercase(field)}
                  value={repo[field]}
                  onChangeText={value => handleChange(field, value)}
                />
              );
            case 'file':
              // setFileIndex(fileIndex + 1);
              return (
                <View key={i} style={styles.mv_15}>
                  <Button
                    status="basic"
                    onPress={() => uploadFileRepoHandler()}>
                    {'Upload ' + stringToUppercase(field)}
                  </Button>
                  <Text category="h6">
                    Selected file: {stringSplitSlash(repo[field])}{' '}
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
