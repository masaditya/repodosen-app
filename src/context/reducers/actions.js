import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import jwebtoken from 'react-native-pure-jwt';

import {
  RESTORE_TOKEN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  RESTORE_FAILED,
  LOGOUT_START,
  LOGOUT_SUCCESS,
} from '../actionTypes';

export const RestoreToken = async () => {
  console.log('CALLED');
  let response = await AsyncStorage.getItem('token')
    .then(result => {
      if (result) {
        return {
          type: RESTORE_TOKEN,
          payload: {
            token: result,
          },
        };
      } else {
        return {
          type: RESTORE_FAILED,
          payload: {
            token: result,
          },
        };
      }
    })
    .catch(error => {
      return {};
    });
  return response;
};

export const Login = async data => {
  const response = await Axios.post('http://192.168.100.2:8000/login', data)
    .then(result => {
      if (result.data.success) {
        const {token} = result.data;
        AsyncStorage.setItem('token', token);
        return {
          type: LOGIN_SUCCESS,
          payload: {
            token: token,
          },
        };
      } else {
        return {
          type: LOGIN_FAILED,
          payload: {},
        };
      }
    })
    .catch(err => {
      console.log(err);
      alert('Invalid Credentials');
    });
  return response;
};

export const Logout = async () => {
  const response = await AsyncStorage.clear()
    .then(result => {
      return {
        type: LOGOUT_SUCCESS,
      };
    })
    .catch(err => {
      console.log(err);
    });
  return response;
};
