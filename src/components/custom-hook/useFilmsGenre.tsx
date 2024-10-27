// hooks/useFilms.ts
import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store/store";
import { db } from "../../config/firebase";
import { setCurrentGenre, setFilms } from "../../store/slices/filmsSlice";

const useFilmsGenre = () => {
//   const [genre, setGenre] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [lastVisible, setLastVisible] = useState<any>(null);
  const dispatch = useDispatch();
  const genre = useSelector((state) => state.films.currentGenre)

  const fetchSortedFilms = async (isLoadMore = false) => {
    try {
      console.log(isLoadMore, 'isLoadMore');
      const coll = collection(db, "films");
      let q = query(coll, orderBy("genre"), limit(12));
  
      if (genre !== "all") {
        q = query(coll, where("genre", "array-contains", genre), orderBy("genre"), limit(12));
      }
  
      // Ako se učitavaju dodatni filmovi
      if (isLoadMore && lastVisible) {
        q = query(q, startAfter(lastVisible), limit(12));
      }
  
      // Proveri koliko filmova ima za odabrani žanr
      const countQuery = query(coll, where("genre", "array-contains", genre));
      const countSnapshot = await getDocs(countQuery);
      const totalCount = countSnapshot.docs.length;
     
      console.log(totalCount, 'totalCount')
      if (totalCount === 0) {
        // Ako nema filmova za odabrani žanr, ne radi ništa
        console.log(`No films found for genre: ${genre}`);
        return;
      }
  
      const querySnapshot = await getDocs(q);
      const filteredFilms = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((film) =>
          film.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
  
      if (isLoadMore) {
        const currentFilms = store.getState().films.films;
        dispatch(setFilms([...currentFilms, ...filteredFilms]));
      } else {
        dispatch(setFilms(filteredFilms));
      }
  
      console.log('filteredFilms', filteredFilms);
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastDoc);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };
  

  const handleGenreChange = (selectedGenre: string) => {
    dispatch(setCurrentGenre(selectedGenre));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
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
    handleGenreChange,
    handleSearchChange,
    handleLoadMore,
    fetchSortedFilms,
  };
};

export default useFilmsGenre;
