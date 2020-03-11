import AsyncStorage from "@react-native-community/async-storage";

export const initialState = {
    isLoading: true,
    isSignout: true,
    userToken: AsyncStorage.getItem('userToken'),
    lightTheme: true
}