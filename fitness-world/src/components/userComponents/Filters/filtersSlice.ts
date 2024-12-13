import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'filter',
    initialState: [{ name: 'bao' }, { name: 'bang' }],
    reducers: {
        searchProducts: (state, action) => {

        }
    },
});
