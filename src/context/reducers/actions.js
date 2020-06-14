import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import jwebtoken from 'react-native-pure-jwt';

import {
    RESTORE_TOKEN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    RESTORE_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
} from '../actionTypes';

const urlServer = "http://192.168.100.2:8000/"

export const RestoreToken = async () => {
    let response = await AsyncStorage.getItem('token')
        .then(result => {
            if (result) {
                return {
                    type: RESTORE_TOKEN,
                    payload: {
                        token: result,
                    },
                };
            } else {
                return {
                    type: RESTORE_FAILED,
                    payload: {
                        token: result,
                    },
                };
            }
        })
        .catch(error => {
            return {};
        });
    return response;
};

export const Login = async data => {
    const response = await Axios.post(urlServer + 'login', data)
        .then(result => {
            if (result.data.success) {
                const {
                    token
                } = result.data;
                AsyncStorage.setItem('token', token);
                return {
                    type: LOGIN_SUCCESS,
                    payload: {
                        token: token,
                    },
                };
            } else {
                return {
                    type: LOGIN_FAILED,
                    payload: {},
                };
            }
        })
        .catch(err => {
            alert('Invalid Credentials');
        });
    return response;
};

export const Logout = async () => {
    const response = await AsyncStorage.clear()
        .then(result => {
            return {
                type: LOGOUT_SUCCESS,
            };
        })
        .catch(err => {});
    return response;
};

export const GetAllData = async (pathname = "", token) => {
    const url = urlServer + "" + pathname.toLowerCase()
    const config = {
        headers: {
            'Authorization': "Bearer " + token
        }
    }
    const response = await Axios.get(url, config)
        .then(res => {
            return res
        }).catch(err => {
            return err
        })
    return response
}

export const CreateData = async (pathname = "", data, token) => {
    const url = urlServer + "" + pathname.toLowerCase()
    const config = {
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': 'multipart/form-data'
        }
    }
    const response = await Axios.post(url, data, config)
        .then(res => {
            if (res.status === 200) {
                return {
                    success: true,
                    message: "Added new data successfully"
                }
            } else {
                return {
                    success: false,
                    message: "Added new data failed"
                }
            }
        }).catch(err => {
            return err
        })
    return response
}

export const UpdateData = async (pathname, id, data, token) => {
    const url = urlServer + "" + pathname.toLowerCase() + "/" + id
    console.log(url)
    const config = {
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': 'multipart/form-data'
        }
    }
    const response = await Axios.put(url, data, config)
        .then(res => {
            console.log(res.data)
            if (res.data.data !== null) {
                return {
                    success: true,
                    message: "Update data successfully"
                }
            } else {
                return {
                    success: false,
                    message: "Update data failed"
                }
            }
        }).catch(err => {
            console.log(err)
            return {
                success: false,
                message: "Update new data failed"
            }
        })
    return response
}

export const DeleteData = async (pathname, id, token) => {
    const url = urlServer + "" + pathname + "/" + id
    const config = {
        headers: {
            'Authorization': "Bearer " + token,
        }
    }
    const response = await Axios.delete(url, config)
        .then(res => {
            if (res.status === 200) {
                return {
                    success: true,
                    message: "Remove data successfully"
                }
            } else {
                return {
                    success: false,
                    message: "Remove data failed"
                }
            }
        }).catch(err => {
            return {
                success: false,
                message: "Added new data failed"
            }
        })
    return response
}

// Profile

export const GetProfiles = async (token) => {
    const url = urlServer + "user/profile/"
    const config = {
        headers: {
            'Authorization': "Bearer " + token
        }
    }
    const response = await Axios.get(url, config)
        .then(res => {
            if (res.status === 200) {
                return {
                    success: true,
                    data: res.data[0]

                }
            } else {
                return {
                    success: false,
                    data: {}
                }
            }
        }).catch(err => {
            return {
                success: false,
                data: {}
            }
        })
    return response
}


export const UpdateProfile = async (data, token) => {
    const url = urlServer + "user/profile/edit"
    const config = {
        headers: {
            'Authorization': "Bearer " + token
        }
    }
    const response = await Axios.patch(url, data, config)
        .then(res => {
            if (res.status === 200) {
                return {
                    success: true,
                    message: "Update data successfully"
                }
            } else {
                return {
                    success: false,
                    message: "Update data failed"
                }
            }
        }).catch(err => {
            return {
                success: false,
                message: "Update new data failed"
            }
        })
    return response
}

export const UpdatePicture = async (data, token) => {

    const url = urlServer + "user/profile/photo/edit"
    const config = {
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': 'multipart/form-data'
        }
    }
    const response = await Axios.patch(url, data, config)
        .then(res => {
            if (res.status === 200) {
                return {
                    success: true,
                    message: "Update picture successfully"
                }
            } else {
                return {
                    success: false,
                    message: "Update pricture failed"
                }
            }
        }).catch(err => {
            return {
                success: false,
                message: "Update new data failed"
            }
        })
    return response
}

export const ChangePassword = async (oldPass, newPass, token) => {
    const url = urlServer + "user/password/change"
    const data = {
        passwordLama: oldPass,
        passwordBaru: newPass
    }
    const config = {
        headers: {
            'Authorization': "Bearer " + token
        }
    }
    const response = await Axios.patch(url, data, config)
        .then(res => {
            if (res.data.status) {
                return {
                    success: true,
                    message: "Update Password successfully"
                }
            } else {
                return {
                    success: false,
                    message: res.data.message
                }
            }
        }).catch(err => {
            return {
                success: false,
                message: "Update new Password failed"
            }
        })
    return response
}