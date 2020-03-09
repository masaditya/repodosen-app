import React from 'react';
import {initialState} from '../reducers/initialState';
import {rootReducer} from '../reducers';
export const RootContext = React.createContext();

export const RootProvider = props => {
  const [globalState, dispatch] = React.useReducer(rootReducer, initialState);
  return (
    <RootContext.Provider value={{globalState, dispatch}}>
      {props.children}
    </RootContext.Provider>
  );
};
