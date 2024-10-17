import { useDispatch } from "react-redux";
import { fetchPagination } from "../../api/paginations";
import { collection, endBefore, getDocs, limit, limitToLast, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../../config/firebase";
import { setFilms } from "../../store/slices/filmsSlice";
import { useEffect, useState } from "react";

const useFilmsPagination = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const dispatch = useDispatch();

  const fetchPaginations = async () => {
    const films = await fetchPagination(setFirstVisible, setLastVisible);
    dispatch(setFilms(films));
  };

  const fetchPage = async (pageIndex) => {
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
      console.log("Nema više podataka");
      return;
    }

    const movies = data.docs.map((doc) => ({ id2: doc.id, ...doc.data() }));
    dispatch(setFilms(movies));

    setLastVisible(data.docs[data.docs.length - 1]);
    setFirstVisible(data.docs[0]);
    setCurrentPage(pageIndex);
  };

  const fetchNextPage = async () => {
    const coll = collection(db, "films");

    const moviesQuery = query(
      coll,
      orderBy("rating", "desc"),
      startAfter(lastVisible),
      limit(12)
    );

    const data = await getDocs(moviesQuery);
    if (data.empty) {
      console.log("Nema više podataka");
      return;
    }

    const movies = data.docs.map((doc) => ({ id2: doc.id, ...doc.data() }));
    dispatch(setFilms(movies));

    setLastVisible(data.docs[data.docs.length - 1]);
    setFirstVisible(data.docs[0]);
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const fetchPreviousPage = async () => {
    if (!firstVisible) return;

    const coll = collection(db, "films");

    const moviesQuery = query(
      coll,
      orderBy("rating", "desc"),
      endBefore(firstVisible),
      limitToLast(12)
    );

    const data = await getDocs(moviesQuery);
    if (data.empty) {
      console.log("Nema više podataka");
      return;
    }

    const movies = data.docs.map((doc) => ({ id2: doc.id, ...doc.data() }));
    dispatch(setFilms(movies));

    setLastVisible(data.docs[data.docs.length - 1]);
    setFirstVisible(data.docs[0]);
    setCurrentPage((currentPage) => currentPage - 1);
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
