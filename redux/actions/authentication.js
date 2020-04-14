import decode from "jwt-decode";

import { SET_CURRENT_USER } from "./types";

import instance from "./instance";
import { AsyncStorage } from "react-native";

export const checkForExpiredToken = () => async dispatch => {

    const token = await AsyncStorage.getItem("token");
    const currentTime = Date.now() / 1000;
    if (token && decode(token).exp >= currentTime)
        dispatch(setCurrentUser(token));
    else setAuthToken();
};

const setAuthToken = async token => {
    if (token) {
        await AsyncStorage.setItem("token", token);
        instance.defaults.headers.Authorization = `jwt ${token}`;
    } else {
        await AsyncStorage.removeItem("token");
        delete instance.defaults.headers.Authorization;
    }
};

const setCurrentUser = token => async dispatch => {
    await setAuthToken(token);
    dispatch({
        type: SET_CURRENT_USER,
        payload: token ? decode(token) : null
    })
};

export const login = (userData) => async dispatch => {
    try {
        const res = await instance.post("login/", userData);
        const { token } = res.data;
        dispatch(setCurrentUser(token));
    } catch (error) {
        console.error(error.response.data);
    }
};

export const signup = (userData) => async dispatch => {
    try {
        await instance.post("register/", userData);
        dispatch(login(userData));
    } catch (error) {
        console.error(error.response.data);
    }
};

export const logout = () => {
    setAuthToken();
    return setCurrentUser(null);
};