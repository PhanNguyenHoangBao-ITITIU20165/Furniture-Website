import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'filter',
    initialState: [{ name: 'bao' }, { name: 'chi' }],
    reducers: {
        searchProducts: (state, action) => {

        }
    },
});
