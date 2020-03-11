import React from 'react';
import {View, Text, ImageBackground, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const CustomCard = props => {
  let screenWidth = Dimensions.get('window').width;
  let screenHeight = Dimensions.get('window').height;
  return (
    <ImageBackground
      source={{
        uri:
          'https://image.freepik.com/free-vector/flat-green-geometric-shapes-background_23-2148379397.jpg',
      }}
      borderRadius={12}
      style={{
        margin: scale(5),
        alignSelf: 'center',
        flexDirection: 'column',
        width: screenWidth - scale(20),
        height: verticalScale(150),
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#777',
        shadowOpacity: 0.16,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0,
        },
      }}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: 12,
          flex: 1,
        }}>
        <View
          style={{
            flex: 4,
            marginLeft: scale(20),
            backgroundColor: 'transparent',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              marginTop: scale(10),
              color: '#fff',
              fontSize: scale(30),
              marginBottom: scale(10),
            }}>
            {props.repo}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: scale(11),
              width: scale(200),
              textAlign: 'justify',
            }}>
            {'Lorem, ipsum dolor sit amet consectetur'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => console.log('Card Custom')}
          style={[
            {
              justifyContent: 'center',
              zIndex: 3,
              alignItems: 'center',
              alignSelf: 'flex-end',
              width: 150,
              height: 40,
              margin: 20,
              shadowRadius: 5,
              borderRadius: 40,
              backgroundColor: '#774898',
            },
          ]}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#ffffff', fontSize: 13, fontWeight: 'bold'}}>
              Check
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default CustomCard;
