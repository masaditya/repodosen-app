import React, {useState, Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Layout} from '@ui-kitten/components';
import {styles} from '../../styles';
import {Header} from '../../components/Header/Header';

export default class AddRepoScreen extends Component {
  state = {
    fileObj: '',
  };

  uploadFileRepoHandler = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(res);
      this.setState({fileObj: res});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  render() {
    return (
      <Layout>
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
            Sertifikasi
          </Text>
        </Layout>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.uploadFileRepoHandler()}>
          <Text style={styles.buttonText}>Click Here To Pick File</Text>
        </TouchableOpacity>
      </Layout>
    );
  }
}

// const AddRepoScreen = ({route}) => {
//   // const [fileRepo, setFileRepo] = useState({});

//   const uploadFileRepoHandler = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//       });
//       setFileRepo(res);
//       // this.setState({singleFileOBJ: res});
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         Alert.alert('Canceled');
//       } else {
//         Alert.alert('Unknown Error: ' + JSON.stringify(err));
//         throw err;
//       }
//     }
//   };

//   return (
//     <Layout>
//       <Header />
//       <Layout
//         style={{
//           paddingHorizontal: '7%',
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}>
//         <Text
//           style={{
//             color: '#bebebe',
//             fontWeight: 'bold',
//             fontSize: 24,
//             paddingVertical: 20,
//           }}>
//           Sertifikasi
//         </Text>
//       </Layout>
//       <TouchableOpacity
//         activeOpacity={0.5}
//         onPress={() => uploadFileRepoHandler()}>
//         <Text style={styles.buttonText}>Click Here To Pick File</Text>
//       </TouchableOpacity>
//     </Layout>
//   );
// };

// export default AddRepoScreen;
