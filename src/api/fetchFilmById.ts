import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import { setCurrentFilm } from "../store/slices/filmsSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

export const fetchFilmById = async (filmId: string,   dispatch: Dispatch, navigate: NavigateFunction) => {
    try {
      let filmRef = doc(db, "films", filmId);
      let filmSnap = await getDoc(filmRef);

      if (!filmSnap.exists()) {
        filmRef = doc(db, "testimonialFilms", filmId);
        filmSnap = await getDoc(filmRef);
      }

      if (filmSnap.exists()) {
        const filmData = { id: filmSnap.id, ...filmSnap.data() };
        dispatch(setCurrentFilm(filmData));
        navigate(`/home/${filmId}`);
        return filmData;
      } else {
        toast.error("Film nije pronađen.");
        return null;
      }
    } catch (error) {
      console.error("Greška pri dohvaćanju filma:", error);
      toast.error("Greška pri dohvaćanju filma.");
      return null;
    }
  };