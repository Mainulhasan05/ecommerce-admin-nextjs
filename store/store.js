import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import categorySlice from '../features/category/categorySlice';
import bannerSlice from '../features/banner/bannerSlice';
import productSlice from '../features/product/productSlice';
import dashboardSlice from '../features/dashboard/dashboardSlice';
const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice,
    banner: bannerSlice,
    product: productSlice,
    dashboard: dashboardSlice
  },
});

export default store;