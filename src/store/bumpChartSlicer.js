import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    datas: []
}


export const bumpChartSlicer = createSlice({
    name: 'bump',
    initialState,
    reducers: {
        addFilteredDatas: (state, action) => {
            state.datas = [...action.payload];
        }
    }
})

export const { addFilteredDatas } = bumpChartSlicer.actions;
export default bumpChartSlicer.reducer;
