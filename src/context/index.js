import React from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {rootReducer} from './reducers';
import {initialState} from './reducers/initialState';

export const RootContext = React.createContext();

export const RootProvider = props => {
  const [globalState, dispatch] = React.useReducer(rootReducer, initialState);

  // const actions = React.useMemo(
  //   () => ({
  //     signIn: async data => {
  //       console.log(data);
  //       await Axios.post('http://192.168.100.220:8000/auth/login', data)
  //         .then(result => {
  //           const {token} = result.data;
  //           AsyncStorage.setItem('token', token);
  //           dispatch({type: 'SIGN_IN', token: token});
  //         })
  //         .catch(err => {
  //           console.log(err);
  //           alert('Invalid Credentials');
  //         });
  //     },
  //     signOut: () => {
  //       AsyncStorage.clear(res => {
  //         console.log(res);
  //         dispatch({type: 'SIGN_OUT'});
  //       });
  //     },
  //     restore: () => {
  //       AsyncStorage.getItem('token')
  //         .then(result => {
  //           dispatch({type: 'RESTORE_TOKEN', token: result});
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         });
  //     },
  //   }),
  //   [],
  // );

  return (
    <RootContext.Provider value={{globalState, dispatch}}>
      {props.children}
    </RootContext.Provider>
  );
};
