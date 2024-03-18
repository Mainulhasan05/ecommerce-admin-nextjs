import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProduct, createProduct, deleteProduct, getProducts, updateProduct } from "./productAPI";

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null
};

export const fetchProducts = createAsyncThunk(
    'seller/fetchProducts',
    async () => {
        const response = await getProducts();
        return response;
    }
);

export const fetchProduct = createAsyncThunk(
    'seller/fetchProduct',
    async (id) => {
        const response = await getProduct(id);
        return response;
    }
);

export const addProduct = createAsyncThunk(
    'seller/addProduct',
    async (data) => {
        const response = await createProduct(data);
        return response;
    }
);

export const editProduct = createAsyncThunk(
    'seller/editProduct',
    async (data) => {
        const response = await updateProduct(data);
        return response;
    }
);

export const removeProduct = createAsyncThunk(
    'seller/removeProduct',
    async (id) => {
        const response = await deleteProduct(id);
        return response;
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setProduct: (state, action) => {
            state.product = action.payload;
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload?.data;
        })
        .addCase(fetchProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        })
        .addCase(addProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(addProduct.rejected, (state, action) => {
            
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload?.data);
        })
        .addCase(editProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(editProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = state.products.map((product) => {
                if(product.id === action.payload.id){
                    return action.payload;
                }
                return product;
            });
        })
        .addCase(removeProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(removeProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = state.products.filter((product) => product.id !== action.payload.id);
        })
    }
});

export const { setProducts, setProduct } = productSlice.actions;
export default productSlice.reducer;