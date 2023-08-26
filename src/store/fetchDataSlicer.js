import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    countries: [],
    loading: false,
    error: null,
}

export const fetchCountries = createAsyncThunk('data/fetchData', async () => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all`)
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(`Error : ${err.message}`)
    }
})


export const fetchDataSlicer = createSlice({
    name: 'countries',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.
            addCase(fetchCountries.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload;
                state.error = null;
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export default fetchDataSlicer.reducer;