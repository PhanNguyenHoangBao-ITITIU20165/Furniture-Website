import { createAsyncThunk } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import axios from 'axios';
import { backendURL } from 'src/constant/api/backendURL';
import { IRootState } from '../store';
import Cookies from 'js-cookie';
import { IUserData } from './authSlice';
import { signInAPI, signUpAPI } from 'src/constant/api/authentication';
import { getUserInfoAPI, updateUserInfoAPI } from 'src/constant/api/userAPI';

interface IUserDataSignIn {
    validUser: IUserData;
    accessToken: string;
    role: string;
}

interface IUserDataSignUp {
    newUser: IUserData;
    accessToken: string;
    role: string;
}

export interface IUserUpdateInfo extends Omit<IUserData, 'password'> {}

export const getUserInfo = createAsyncThunk('auth/getUserInfo', async (_, { rejectWithValue }) => {
    try {
        const token = Cookies.get('accessToken');
        const response = await getUserInfoAPI(token);

        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
});

export const updateUserInfo = createAsyncThunk(
    'auth/updateUserInfo',
    async (userUpdateInfo: IUserUpdateInfo, { rejectWithValue }) => {
        try {
            const token = Cookies.get('accessToken');
            const response = await updateUserInfoAPI(token, userUpdateInfo);
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const userSignIn = createAsyncThunk('auth/signin', async (userData: IUserData, { rejectWithValue }) => {
    try {
        const { data } = await signInAPI(userData);

        Cookies.set('accessToken', data.cookie, { expires: 7 });

        const { role, ...userDataTemp } = data.validUser;

        const finalData: IUserDataSignIn = {
            role: data.validUser.role,
            validUser: userDataTemp,
            accessToken: data.cookie,
        };
        return finalData;
    } catch (err: any) {
        if (err.response && err.response.message) {
            return rejectWithValue(err.response.message);
        } else {
            return rejectWithValue(err.message);
        }
    }
});

export const userSignUp = createAsyncThunk('auth/signup', async (userData: IUserData, { rejectWithValue }) => {
    try {
        const { data } = await signUpAPI(userData);

        Cookies.set('accessToken', data.cookie, { expires: 7 });

        const { role, ...userDataTemp } = data.newUser;

        const finalData: IUserDataSignUp = {
            role: data.newUser.role,
            newUser: userDataTemp,
            accessToken: data.cookie,
        };

        console.log(finalData);
        return finalData;
    } catch (error: any) {
        if (error.response && error.response.message) return rejectWithValue(error.response.message);
        else return rejectWithValue(error.response);
    }
});

export const userSignOut = createAsyncThunk('auth/signout', async () => {
    localStorage.removeItem('accessToken');
});

// Future work
export const UserForgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (userData: IUserData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${backendURL}/api/forgotPassword`, userData, {
                headers: {
                    'content-type': 'application/json',
                },
            });
            return data;
        } catch (error: any) {
            if (error.response && error.response.message) return rejectWithValue(error.response.message);
            else return rejectWithValue(error.response);
        }
    },
);
