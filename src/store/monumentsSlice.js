import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "@/api/http";

export const fetchMonuments = createAsyncThunk("monuments/fetchMonuments", async () => {
    try {
        const response = await http.get("/monuments/getallmonuments");
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
});

const monumentsSlice = createSlice({
    name: "monuments",

    initialState: {
        monuments: [],

        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchMonuments.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(fetchMonuments.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.monuments = action.payload;
            })
            .addCase(fetchMonuments.rejected, (state, action) => {
                state.status = "rejected";
                state.monuments = action.error.message;
            })
    }
});

export const monumentsReducer = monumentsSlice.reducer;