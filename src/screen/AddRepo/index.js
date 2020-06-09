import React, {useState, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {
  Layout,
  Input,
  Select,
  Button,
  Datepicker,
  SelectItem,
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

const AddRepoScreen = ({route}) => {
  const {globalState, dispatch} = useContext(RootContext);
  const [inputText, setInputText] = useState({});
  const [fileList, setFileList] = useState([]);
  const [date, setDate] = React.useState(new Date());
  const [fileIndex, setFileIndex] = useState(0);
  const formControl = models[stringToLow(route.params.repo)];

  const handleUpload = () => {
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then(result => {
        console.log('RESULT ', result);
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then(statResult => {
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1], 'utf8');
        }

        return 'no file';
      })
      .then(contents => {
        // log the file contents
        console.log(contents);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  };

  const uploadFileRepoHandler = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log(res);
      // const imagePath = `${
      //   RNFS.DocumentDirectoryPath
      // }/${new Date().toISOString()}.jpg`.replace(/:/g, '-');
      setFileList([...fileList, res]);
      // let tmp = fileList;
      // tmp[index] = res;
      // console.log(stringSplitSlash(tmp[index].uri));

      // setFileList(tmp);
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

    CreateData(route.params.repo, formData, globalState.token)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
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
          {route.params.repo}
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
                  onChangeText={value => handleChange(field, value)}
                />
              );
            case 'number':
              return (
                <Input
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
                    status="basic"
                    onPress={() => uploadFileRepoHandler()}>
                    {'Upload ' + stringToUppercase(field)}
                  </Button>
                  {/* <Text category="h6">
                    Selected file:{' '}
                    {fileList.length > 0
                      ? stringSplitSlash(fileList[fileIndex - 1].uri)
                      : fileList.length}
                  </Text> */}
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

export default AddRepoScreen;
