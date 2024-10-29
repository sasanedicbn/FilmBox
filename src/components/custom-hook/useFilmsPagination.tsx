import { useDispatch, useSelector } from "react-redux";
import { fetchPagination } from "../../api/paginations";
import { collection, endBefore, getDocs, limit, limitToLast, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../../config/firebase";
import { setFilms } from "../../store/slices/filmsSlice";
import { useEffect, useState } from "react";

const useFilmsPagination = () => {
  const [lastVisible, setLastVisible] = useState<null | any>(null);
  const [firstVisible, setFirstVisible] = useState<null | any>(null);
  const dispatch = useDispatch();
  const genre = useSelector((state) => state.films.currentGenre)

  const fetchPaginations = async () => {
    const films = await fetchPagination(setFirstVisible, setLastVisible);
    dispatch(setFilms(films));
  };

  const fetchPage = async (pageIndex:number) => {
    const coll = collection(db, "films");
    const offset = pageIndex * 12;
    const moviesQuery = query(
      coll,
      orderBy("rating", "desc"),
      limit(12),
      startAfter(offset > 0 ? lastVisible : null)
    );

    const data = await getDocs(moviesQuery);
    if (data.empty) {
      return;
    }

    const movies = data.docs.map((doc) => ({ id2: doc.id, ...doc.data() }));
    dispatch(setFilms(movies));

    setLastVisible(data.docs[data.docs.length - 1]);
    setFirstVisible(data.docs[0]);
  };

  const fetchNextPage = async () => {
    const coll = collection(db, "films");
  

    const moviesQuery = query(
      coll,
      orderBy("rating", "desc"),
      limit(12),
      startAfter(lastVisible)
    );
  
    if (!moviesQuery) {
      console.log("Neispravan uslov za sledeću stranicu", moviesQuery);
      return;
    }
  
    const data = await getDocs(moviesQuery);
    console.log(data, 'data')

    if (data.empty) {
      console.log("Nema više podataka");
      return;
    }
  
    const movies = data.docs.map((doc) => ({ id2: doc.id, ...doc.data() }));
    console.log('movies next', movies);
    dispatch(setFilms(movies));
  
    setLastVisible(data.docs[data.docs.length - 1]);
    setFirstVisible(data.docs[0]);
  };
  

  const fetchPreviousPage = async () => {
    const coll = collection(db, "films");

    const moviesQuery = query(
      coll,
      orderBy("rating", "desc"),
      limit(12),
      endBefore(firstVisible), limitToLast(12)
    );
    
    console.log(moviesQuery, 'moviesQuery')
    if (!moviesQuery) {
      console.log("Neispravan uslov za prethodnu stranicu");
      return;
    }

    const data = await getDocs(moviesQuery);
    if (data.empty) {
      console.log("Nema više podataka");
      return;
    }

    const movies = data.docs.map((doc) => ({ id2: doc.id, ...doc.data() }));
    dispatch(setFilms(movies));

    setLastVisible(data.docs[data.docs.length - 1]);
    setFirstVisible(data.docs[0]);
  };

  useEffect(() => {
    fetchPaginations();
  }, []);

  return {
    fetchPage,
    fetchNextPage,
    fetchPreviousPage,
  };
};

export default useFilmsPagination;
