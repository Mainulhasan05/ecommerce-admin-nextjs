import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import categorySlice from '../features/category/categorySlice';
import bannerSlice from '../features/banner/bannerSlice';
const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice,
    banner: bannerSlice
  },
});

export default store;