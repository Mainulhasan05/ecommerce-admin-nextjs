import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getOrders,getOrder} from "./orderAPI";

const initialState = {
    orders: [],
    order:{},
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

export const fetchOrder = createAsyncThunk(
    'seller/fetchOrder',
    async (id) => {
        const response = await getOrder(id);
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
            })
            .addCase(fetchOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload.data;
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;