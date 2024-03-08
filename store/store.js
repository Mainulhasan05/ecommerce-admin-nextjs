import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import categorySlice from '../features/category/categorySlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice
  },
});

export default store;