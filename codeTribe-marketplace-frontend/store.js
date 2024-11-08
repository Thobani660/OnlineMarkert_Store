import { configureStore } from '@reduxjs/toolkit';
import userReducer from './src/features/userSlice'
import productReducer from './src/features/productSlice';
import authSlice from './src/features/authSlice';
import cartSlice from './src/features/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    auth : authSlice,
    cart: cartSlice
    
  },
});

export default store;
