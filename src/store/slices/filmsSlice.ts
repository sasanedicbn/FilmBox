import { createSlice } from '@reduxjs/toolkit';
import store from '../store';

const initialState = {
  films: [],
  testimonialFilms: [],
  currentFilm: null,
  markedFilms: [],
  currentGenre: null,
  searchTerm: '',  
};

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilms(state, action) {
      state.films = action.payload;
    },
    setBookedFilms(state, action) {
      state.markedFilms = action.payload;
    },
    getTestimonialFilms(state, action) {
      state.testimonialFilms = action.payload;
    },
    setCurrentFilm: (state, action) => {
      state.currentFilm = action.payload;
    },
    clearCurrentFilm: (state) => {
      state.currentFilm = null;
    },
    setCurrentGenre: (state, action) => {
      state.currentGenre = action.payload;
    },
    setSearchTerm: (state, action) => {  
      state.searchTerm = action.payload;
    },
  },
});


export type RootState = ReturnType<typeof store.getState>;
export const { setFilms, getTestimonialFilms, setCurrentFilm, clearCurrentFilm, setBookedFilms, setCurrentGenre, setSearchTerm } = filmsSlice.actions;

export default filmsSlice.reducer;
