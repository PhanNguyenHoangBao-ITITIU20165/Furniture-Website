import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface INavbarPath {
    path: string;
}

const initialState: INavbarPath = { path: 'home' };

export const navbarPathSlice = createSlice({
    name: 'navbarPath',
    initialState,
    reducers: {
        setSelectedPath: (state, action: PayloadAction<string>) => {
            state.path = action.payload;
        },
    },
});

export const { setSelectedPath } = navbarPathSlice.actions;
