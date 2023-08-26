import { configureStore } from "@reduxjs/toolkit";
import bumpChartReducer from "./bumpChartSlicer";
import fetchDataSlice from "./fetchDataSlicer";

export const store = configureStore({
    reducer: {
        bump: bumpChartReducer,
        countries: fetchDataSlice
    }
})