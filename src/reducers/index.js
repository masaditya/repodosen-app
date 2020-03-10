export const rootReducer = (prevState, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...prevState,
                userToken: action.token,
                    isLoading: false,
            };
        case 'SIGN_IN':
            return {
                ...prevState,
                isSignout: false,
                    userToken: action.token,
            };
        case 'SIGN_OUT':
            return {
                ...prevState,
                isSignout: true,
                    userToken: null,
            };
        default:
            return {
                ...prevState
            }
    }
}