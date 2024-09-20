import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  films: [],
  testimonialFilms: []
};

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilms(state, action){
        state.films = action.payload
    },
    getTestimonialFilms(state, action) {
      state.testimonialFilms = action.payload
    }
  },
});

export const { setFilms, getTestimonialFilms } = filmsSlice.actions;

export default filmsSlice.reducer;
