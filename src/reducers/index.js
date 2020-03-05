export const authReducer = (prevState, action) => {
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
                    userToken: action.userToken,
            };
        case 'SIGN_OUT':
            return {
                ...prevState,
                isSignout: true,
                    userToken: null,
            };
    }
}