import { configureStore } from '@reduxjs/toolkit';
import filmsSlice from './slices/filmsSlice';
import loadingSlice from './slices/loadingSlice';

export const store = configureStore({
  reducer: {
    films: filmsSlice, 
    loading: loadingSlice,
  },
});

export default store;
