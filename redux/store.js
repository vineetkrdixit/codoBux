// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import personalInfoReducer from './slices/personalInfoSlice';

const store = configureStore({
  reducer: {
    personalInfo: personalInfoReducer,
  },
});

export default store;