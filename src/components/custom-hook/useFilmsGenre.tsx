import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store/store";
import { db } from "../../config/firebase";
import { RootState, setCurrentGenre, setFilms } from "../../store/slices/filmsSlice";
import { toast } from "react-toastify";
import { Film } from "../../types/types";

const useFilmsGenre = () => {
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [totalCount, setTotalCount] = useState<number>(0); 
  const genre = useSelector((state:RootState) => state.films.currentGenre);
  const searchTerm = useSelector((state:RootState) => state.films.searchTerm)
  const dispatch = useDispatch();

  const fetchSortedFilms = async (isLoadMore = false) => {
    try {
      const coll = collection(db, "films");
      let q = query(coll, orderBy("genre"), limit(12));

      if (genre !== "all") {
        q = query(coll, where("genre", "array-contains", genre), orderBy("genre"), limit(12));
      }
     
      if (isLoadMore && lastVisible) {
        q = query(q, startAfter(lastVisible), limit(12));
      }

      const countQuery = query(coll, where("genre", "array-contains", genre));
      const countSnapshot = await getDocs(countQuery);
      const total = countSnapshot.docs.length; 

      setTotalCount(total); 

      if (total === 0) {
        console.log(`No films found for genre: ${genre}`);
        return;
      }

      const querySnapshot = await getDocs(q);
      const filteredFilms = querySnapshot.docs
        .map((doc) => ({
          id2: doc.id,
          ...doc.data(),
        } as Film))
        .filter((film) =>
          film.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) 

      if (isLoadMore) {
        const currentFilms = store.getState().films.films;
        dispatch(setFilms([...currentFilms, ...filteredFilms]));
      } else {
        dispatch(setFilms(filteredFilms));
      }

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastDoc);
    } catch (error) {
      toast.error("Error fetching films");
    }
  };

  const handleGenreChange = (selectedGenre: string) => {
    const newGenre = selectedGenre === "all" ? null : selectedGenre;
    dispatch(setCurrentGenre(newGenre));
  };

  const handleLoadMore = () => {
    fetchSortedFilms(true);
  };

  useEffect(() => {
    fetchSortedFilms();
  }, [genre, searchTerm]);

  return {
    genre,
    searchTerm,
    totalCount, 
    handleGenreChange,
    handleLoadMore,
    fetchSortedFilms,
  };
};

export default useFilmsGenre;
