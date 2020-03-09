export const actions = () => ({
    signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({
            type: 'SIGN_IN',
            token: 'dummy-auth-token'
        });
    },
    signOut: () => dispatch({
        type: 'SIGN_OUT'
    }),
    signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({
            type: 'SIGN_IN',
            token: 'dummy-auth-token'
        });
    },
})