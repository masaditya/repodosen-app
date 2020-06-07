import {
  RESTORE_TOKEN,
  LOGIN_SUCCESS,
  RESTORE_FAILED,
  LOGOUT_SUCCESS,
} from '../actionTypes';

export const rootReducer = (prevState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...prevState,
        token: action.payload.token,
        isLoading: false,
      };
    case RESTORE_FAILED:
      return {
        ...prevState,
        token: null,
        isLoading: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...prevState,
        isSignout: false,
        token: action.payload.token,
      };
    case LOGOUT_SUCCESS:
      return {
        ...prevState,
        isSignout: true,
        token: null,
      };
    default:
      return {
        ...prevState,
      };
  }
};
