import React from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {rootReducer} from './reducers';
import {initialState} from './reducers/initialState';

export const RootContext = React.createContext();

export const RootProvider = props => {
  const [globalState, dispatch] = React.useReducer(rootReducer, initialState);


  return (
    <RootContext.Provider value={{globalState, dispatch}}>
      {props.children}
    </RootContext.Provider>
  );
};
