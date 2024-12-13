import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import { IRootState } from '../store';
import { UserForgotPassword, getUserInfo, updateUserInfo, userSignIn, userSignOut, userSignUp } from './authApi';
import Cookies from 'js-cookie';

// const accessToken = Cookies.get('accessToken') ?? null;
// console.log(accessToken);
export interface IUserData {
    id: string;
    fullname: string;
    phone: string;
    address: string;
    email: string;
    country: string;
    password: string;
}

interface IUserState {
    userData: any | undefined;
    accessToken: string | null;
    loading: boolean;
    error: Object | null;
    role: string;
}

const initialState: IUserState = {
    userData: null,
    accessToken: null,
    loading: false,
    error: null,
    role: 'unknown',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut: (state) => {
            Cookies.remove('accessToken');
            state.loading = false;
            state.error = null;
            state.userData = null;
            state.accessToken = null;
            state.role = 'unknown';
        },
        setCredentials: (state, { payload }) => {
            state.userData = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Sign In
            .addCase(userSignIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userSignIn.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.userData = payload.validUser;
                state.role = payload.role;
                state.accessToken = payload.accessToken;
            })
            .addCase(userSignIn.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload ? payload : null;
            })
            // Sign Up
            .addCase(userSignUp.pending, (state) => {
                state.loading = true;
            })
            .addCase(userSignUp.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.userData = payload.newUser;
                state.role = payload.role;
                state.accessToken = payload.accessToken;
                state.error = null;
            })
            .addCase(userSignUp.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload ? payload : null;
            })
            // get user info after reloading
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserInfo.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.userData = payload;
                state.role = payload.role;
                // state.accessToken = payload.cookie;
            })
            .addCase(getUserInfo.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload ? payload : null;
            })
            //update user info
            .addCase(updateUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
                state.loading = false;
                // state.userData = payload;
            })
            .addCase(updateUserInfo.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload ? payload : null;
            });
        // Forgot password
    },
});

export const { signOut, setCredentials } = authSlice.actions;
export default authSlice;

// export const currentToken = (state: IRootState) => state.authaccessToken.
