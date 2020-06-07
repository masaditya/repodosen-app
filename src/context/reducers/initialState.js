import AsyncStorage from "@react-native-community/async-storage";

export const initialState = {
    isLoading: true,
    isSignout: true,
    token: AsyncStorage.getItem('token'),
    lightTheme: true
}