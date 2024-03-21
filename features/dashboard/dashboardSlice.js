import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDashboard } from "./dashboardAPI";

const initialState = {
    dashboard: null,
    loading: false,
    error: null
};

export const fetchDashboard = createAsyncThunk(
    'seller/fetchDashboard',
    async () => {
        const response = await getDashboard();
        return response;
    }
);

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDashboard: (state, action) => {
            state.dashboard = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboard = action.payload.data;
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;