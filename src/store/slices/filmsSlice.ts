import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  films: null
};

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilms(state, action){
        state.films = action.payload
    }
  },
});

export const { setFilms } = filmsSlice.actions;

export default filmsSlice.reducer;
