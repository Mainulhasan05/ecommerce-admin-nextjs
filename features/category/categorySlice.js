import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategory, createCategory, deleteCategory, getCategories, updateCategory } from "./categoryAPI";

const initialState = {
    categories: [],
    category: null,
    loading: false,
    error: null
};

export const fetchCategories = createAsyncThunk(
    'seller/fetchCategories',
    async () => {
        const response = await getCategories();
        return response;
    }
);

export const fetchCategory = createAsyncThunk(
    'seller/fetchCategory',
    async (id) => {
        const response = await getCategory(id);
        return response;
    }
);

export const addCategory = createAsyncThunk(
    'seller/addCategory',
    async (data) => {
        const response = await createCategory(data);
        return response;
    }
);

export const editCategory = createAsyncThunk(
    'seller/editCategory',
    async (data) => {
        const response = await updateCategory(data);
        return response;
    }
);

export const removeCategory = createAsyncThunk(
    'seller/removeCategory',
    async (id) => {
        const response = await deleteCategory(id);
        return response;
    }
);

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload?.data;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload?.data;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.concat({ ...action.payload?.data});
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(editCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload?.data;
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(category => category.id !== action.meta?.arg);
            })
            .addCase(removeCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }
        );
    }
});

export const { setCategories, setCategory } = categorySlice.actions;

export default categorySlice.reducer;
