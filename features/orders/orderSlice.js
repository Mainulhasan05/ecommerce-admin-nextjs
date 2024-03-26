import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getOrders} from "./orderAPI";

const initialState = {
    orders: [],
    loading: false,
    error: null
};

export const fetchOrders = createAsyncThunk(
    'seller/fetchOrders',
    async () => {
        const response = await getOrders();
        return response;
    }
);

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.data;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;