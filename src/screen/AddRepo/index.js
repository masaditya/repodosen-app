import React, {useState, Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {
  Layout,
  Input,
  Select,
  RangeCalendar,
  Calendar,
  Popover,
  Button,
} from '@ui-kitten/components';
import {styles} from '../../styles';
import {Header} from '../../components/Header/Header';

const AddRepoScreen = () => {
  const [fileRepo, setFileRepo] = useState('');

  const uploadFileRepoHandler = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(res);
      setFileRepo(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const [expiredDate, setExpiredDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const data = [{text: 'Option 1'}, {text: 'Option 2'}, {text: 'Option 3'}];

  const CalendarContent = () => (
    <Calendar date={expiredDate} onSelect={setExpiredDate} />
  );

  const toggleCalendar = () => {
    console.log(showCalendar);
    setShowCalendar(!showCalendar);
  };

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
      <Layout style={styles.ph_15}>
        <Input style={styles.mv_15} label="Nama Kegiatan" value={fileRepo} />
        <Input style={styles.mv_15} label="No. Sertifikat" value={fileRepo} />
        <Select style={styles.mv_15} label="Bidang Kompetensi" data={data} />
        <Popover
          visible={showCalendar}
          onBackdropPress={toggleCalendar}
          content={CalendarContent()}>
          <Button status="basic" onPress={toggleCalendar}>
            {expiredDate.toLocaleDateString()}
          </Button>
        </Popover>
      </Layout>
    </Layout>
  );
};

//
//     -
//     -
//     - Jangka Waktu Berlaku
//     - File Sertifikat
//     - File Surat Tugas (Opsional)

export default AddRepoScreen;
