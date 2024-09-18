import { configureStore } from '@reduxjs/toolkit';
import filmsSlice from './slices/filmsSlice';

export const store = configureStore({
  reducer: {
    counter: filmsSlice, 
  },
});

export default store;
