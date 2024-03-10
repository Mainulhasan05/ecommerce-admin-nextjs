import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBanners, createBanner, deleteBanner, updateBanner } from "./bannerAPI";

const initialState = {
    banners: [],
    banner: null,
    loading: false,
    error: null
};

export const fetchBanners = createAsyncThunk(
    'seller/fetchBanners',
    async () => {
        const response = await getBanners();
        return response;
    }
);

export const addBanner = createAsyncThunk(
    'seller/addBanner',
    async (data) => {
        const response = await createBanner(data);
        return response;
    }
);

export const editBanner = createAsyncThunk(
    'seller/editBanner',
    async (data) => {
        const response = await updateBanner(data);
        return response;
    }
);

export const removeBanner = createAsyncThunk(
    'seller/removeBanner',
    async (id) => {
        const response = await deleteBanner(id);
        return response;
    }
);

export const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
        setBanners: (state, action) => {
            state.banners = action.payload;
        },
        setBanner: (state, action) => {
            state.banner = action.payload;
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchBanners.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchBanners.fulfilled, (state, action) => {
            state.loading = false;
            state.banners = action.payload;
        })
        .addCase(fetchBanners.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(addBanner.pending, (state) => {
            state.loading = true;
        })
        .addCase(addBanner.fulfilled, (state, action) => {
            state.loading = false;
            state.banners.push(action.payload);
        })
        .addCase(addBanner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(editBanner.pending, (state) => {
            state.loading = true;
        })
        .addCase(editBanner.fulfilled, (state, action) => {
            state.loading = false;
            state.banners = state.banners.map((banner) => {
                if(banner._id === action.payload._id){
                    return action.payload;
                }
                return banner;
            })
        })
        .addCase(editBanner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(removeBanner.pending, (state) => {
            state.loading = true;
        })
        .addCase(removeBanner.fulfilled, (state, action) => {
            state.loading = false;
            state.banners = state.banners.filter((banner) => banner._id !== action.payload._id);
        })
        .addCase(removeBanner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export const { setBanners, setBanner } = bannerSlice.actions;

export default bannerSlice.reducer;