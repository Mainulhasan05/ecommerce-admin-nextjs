import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser,getMyShop } from "./userAPI";

const initialState = {
    user: null,
    category:[],
    shop:null,
    loading: false,
    error: null
};

export const fetchUser = createAsyncThunk(
    'seller/profile',
    async () => {
        const response = await getUser();
        return response;
    }
);

export const fetchShop = createAsyncThunk(
    'seller/shop',
    async () => {
        const response = await getMyShop();
        return response;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setShop: (state, action) => {
            state.shop = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.data;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchShop.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchShop.fulfilled, (state, action) => {
                state.loading = false;
                state.shop = action.payload?.data;
            })
            .addCase(fetchShop.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setUser,setShop } = userSlice.actions;

export default userSlice.reducer;
