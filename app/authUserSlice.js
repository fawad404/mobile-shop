import { createSlice } from '@reduxjs/toolkit';

// Get initial state from localStorage
const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('authUser');
    const storedCart = localStorage.getItem('cart');
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      cart: storedCart ? JSON.parse(storedCart) : [],
    };
  }
  return { user: null, cart: [] };
};

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: getInitialState(),
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload.user;
      state.cart = action.payload.cart;
      // Store in localStorage
      localStorage.setItem('authUser', JSON.stringify(action.payload.user));
      localStorage.setItem('cart', JSON.stringify(action.payload.cart));
    },
    clearAuthUser: (state) => {
      state.user = null;
      state.cart = [];
      // Clear localStorage
      localStorage.removeItem('authUser');
      localStorage.removeItem('cart');
    },
    updateCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem('cart', JSON.stringify(action.payload));
    },
  },
});

export const { setAuthUser, clearAuthUser, updateCart } = authUserSlice.actions;
export default authUserSlice.reducer;
