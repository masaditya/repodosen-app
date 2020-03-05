import React, {
    useMemo
} from 'react'

import {
    contextState,
    contextDispatch
} from '../../reducers/index'

export const authContext = useMemo(
    () => ({
        signIn: async data => {
            contextDispatch({
                type: 'SIGN_IN',
                token: 'dummy-auth-token'
            });
        },
        signOut: () => dispatch({
            type: 'SIGN_OUT'
        }),
        signUp: async data => {
            contextDispatch({
                type: 'SIGN_IN',
                token: 'dummy-auth-token'
            });
        },
    }),
    [],
);