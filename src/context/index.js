import React from 'react';
import {initialState} from '../reducers/initialState';
import {rootReducer} from '../reducers';

import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

export const RootContext = React.createContext();

export const RootProvider = props => {
  const [globalState, dispatch] = React.useReducer(rootReducer, initialState);

  const actions = React.useMemo(
    () => ({
      signIn: async data => {
        console.log(data);
        await Axios.post('http://192.168.100.220:8000/auth/login', data)
          .then(result => {
            const {access_token} = result.data;
            AsyncStorage.setItem('userToken', access_token);
            dispatch({type: 'SIGN_IN', token: access_token});
          })
          .catch(err => {
            console.log(err);
            alert('Invalid Credentials');
          });
      },
      signOut: () => {
        AsyncStorage.clear(res => {
          console.log(res);
          dispatch({type: 'SIGN_OUT'});
        });
      },
      restore: () => {
        AsyncStorage.getItem('userToken')
          .then(result => {
            dispatch({type: 'RESTORE_TOKEN', token: result});
          })
          .catch(err => {
            console.log(err);
          });
      },
    }),
    [],
  );

  return (
    <RootContext.Provider value={{globalState, actions}}>
      {props.children}
    </RootContext.Provider>
  );
};
