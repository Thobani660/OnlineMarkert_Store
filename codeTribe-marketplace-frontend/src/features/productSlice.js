import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  cart: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
  },
});

export const { setProducts, addProduct, addToCart, removeFromCart } = productSlice.actions;
export default productSlice.reducer;
