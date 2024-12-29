import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUserSlice';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
});

export default store;
