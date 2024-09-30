import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  films: [],
  testimonialFilms: [],
  currentFilm: null,
  markedFilms: []
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
    },
    setCurrentFilm: (state, action) => {
      state.currentFilm = action.payload;
    },
    clearCurrentFilm: (state) => {
      state.currentFilm = null;
    },
    addMarketFilms:(state, action) => {
      state.markedFilms = action.payload
    }}
  },
});

export const { setFilms, getTestimonialFilms, setCurrentFilm, clearCurrentFilm, addMarketFilms } = filmsSlice.actions;

export default filmsSlice.reducer;
