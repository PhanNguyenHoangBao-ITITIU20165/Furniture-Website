import { createSelector } from "@reduxjs/toolkit";

export const filterSelector = (state: any) => state.filter.searchProducts

export const mainSelector = createSelector(filterSelector,(search:any) => {
    return 
})
