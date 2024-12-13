import { message } from 'antd';
import { IUserData } from '../api/authSlice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUsersAPI } from 'src/constant/api/userAPI';
import Cookies from 'js-cookie';

export interface IUserFullData extends Omit<IUserData, 'password'> {
    profileImg_dir: any;
    createdAt: string;
    updatedAt: string;
    role: string
}

export interface IUserList {
    userList: IUserFullData[];
    loading: boolean;
    error: Object | null;
    message: string;
}

const initialState: IUserList = {
    userList: [],
    loading: false,
    error: null,
    message: '',
};

export const getAllUsers = createAsyncThunk('user/getAllUsers', async (_, { rejectWithValue }) => {
    try {
        const adminToken = Cookies.get('accessToken');

        const { data } = await getAllUsersAPI(adminToken);

        const usersData: IUserFullData[] = data;

        for (const user of usersData) {
            const formattedTime = (dateObject: Date) => {
                const hours = dateObject.getHours().toString().padStart(2, '0');
                const minutes = dateObject.getMinutes().toString().padStart(2, '0');
                const day = dateObject.getDate().toString().padStart(2, '0');
                const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0
                const year = dateObject.getFullYear();

                return `${hours}:${minutes} - ${day}/${month}/${year}`;
            };

            user.createdAt = formattedTime(new Date(user.createdAt));
            user.updatedAt = formattedTime(new Date(user.updatedAt));
        }

        return usersData;
    } catch (err: any) {
        return rejectWithValue(err);
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.userList = payload;
            })
            .addCase(getAllUsers.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload ? payload : null;
            });
    },
});
