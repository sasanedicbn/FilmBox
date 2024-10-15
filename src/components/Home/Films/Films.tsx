import { useEffect, useState } from "react";
import CardTestimonial from "../testimonial/CardTestimonial";
import FilmsDetails from "./FilmsDetails";
import { collection, getDocs, limit, orderBy, query, startAfter, startAt } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setFilms } from "../../../store/slices/filmsSlice";

const Films = () => {
  const [pageHistory, setPageHistory] = useState([]); // Istorija paginacije
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // Trenutni indeks stranice
  const films = useSelector(state => state.films.films);
  const dispatch = useDispatch();

  const fetchMovies = async (startAfterDoc = null) => {
    const coll = collection(db, "films");
    let moviesQuery;

    if (startAfterDoc) {
      moviesQuery = query(coll, orderBy("rating", "desc"), startAfter(startAfterDoc), limit(12));
    } else {
      moviesQuery = query(coll, orderBy("rating", "desc"), limit(12));
    }

    const data = await getDocs(moviesQuery);
    if (data.empty) {
      console.log("Nema više podataka");
      return;
    }

    const movies = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch(setFilms(movies));

    // Ažuriraj istoriju stranica
    const lastDoc = data.docs[data.docs.length - 1];
    if (startAfterDoc) {
      setPageHistory((prevHistory) => [...prevHistory, lastDoc]);
    } else {
      setPageHistory([lastDoc]); // Resetuj istoriju prilikom prvog učitavanja
    }
  };

  const fetchNextPage = async () => {
    if (pageHistory.length === 0 || currentPageIndex >= pageHistory.length - 1) return;
    const nextDoc = pageHistory[currentPageIndex];
    await fetchMovies(nextDoc);
    setCurrentPageIndex((prevIndex) => prevIndex + 1);
  };

  const fetchPreviousPage = async () => {
    if (currentPageIndex <= 0) return;
    const prevDoc = pageHistory[currentPageIndex - 1];
    await fetchMovies(prevDoc);
    setCurrentPageIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    fetchMovies(); // Učitaj prvu stranicu pri montiranju
  }, []);

  return (
    <div className="max-w-[71rem] mx-auto mt-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {films.map((film) => (
          <div key={film.id} className="flex flex-col">
            <CardTestimonial testimonialFilms={film} />
            <FilmsDetails films={film} />
          </div>
        ))}
      </div>
      <button className="bg-slate-50 mr-4" onClick={fetchPreviousPage} disabled={currentPageIndex === 0}>
        Previous
      </button>
      <button className="bg-slate-50 mr-4" onClick={fetchNextPage} disabled={currentPageIndex >= pageHistory.length - 1}>
        Next
      </button>
    </div>
  );
};

export default Films;
