import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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
    setBookedFilms(state, action){
        state.markedFilms = action.payload
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
      const existingFilm = state.markedFilms.find(film => film.id2 === action.payload.id2)
      if(!existingFilm){
        state.markedFilms.push(action.payload)
        toast.success("Film marked successfully!"); 
      } else {
        state.markedFilms.splice(existingFilm, 1)
        toast.error("Remove marked from film.");
    }}
  },
});

export const { setFilms, getTestimonialFilms, setCurrentFilm, clearCurrentFilm, addMarketFilms, setBookedFilms } = filmsSlice.actions;

export default filmsSlice.reducer;
