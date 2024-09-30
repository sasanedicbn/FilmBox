import { useEffect, useState } from "react";
import CardTestimonial from "../testimonial/CardTestimonial";
import FilmsDetails from "./FilmsDetails";
import { collection, endBefore, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../../../config/firebase";

const Films = () => {
  const [films, setFilms] = useState([]); 
  const [currentPage, setCurrentPage] = useState(0); // Početna stranica 0
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  
  const fetchMovies = async (startAfterDoc = null, previous = false) => {
    const coll = collection(db, "films");

    const moviesQuery = startAfterDoc 
      ? query(coll, orderBy('rating', "desc"), previous ? endBefore(startAfterDoc) : startAfter(startAfterDoc), limit(12)) 
      : query(coll, orderBy('rating', "desc"), limit(12));

    const data = await getDocs(moviesQuery);

    if (data.empty) {
      console.log('Nema više podataka');
      return;
    }

    const movies = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setFilms(movies); 

    const lastVisibleRef = data.docs[data.docs.length - 1];
    setLastVisible(lastVisibleRef);

    const firstVisibleRef = data.docs[0];
    setFirstVisible(firstVisibleRef); // Postavljanje firstVisible na prvi dokument

    console.log('firstVisible', firstVisibleRef);
  };

  const fetchNextPage = async () => {
    if (!lastVisible) return; 
    await fetchMovies(lastVisible); 
    setCurrentPage(currentPage + 1);
  };

  const fetchPreviousPage = async () => {
    if (!firstVisible || currentPage <= 0) return; // Dodaj proveru da li je trenutna stranica veća od 0
    await fetchMovies(firstVisible, true);
    setCurrentPage(currentPage - 1); // Smanji trenutnu stranicu
  };

  useEffect(() => {
    fetchMovies(); 
  }, []);

  return (
    <div className="max-w-[71rem] mx-auto mt-14">
      <div className="grid grid-cols-4 gap-6">
        {films.map((film) => (
          <div key={film.id} className="flex flex-col">
            <CardTestimonial testimonialFilms={film} />
            <FilmsDetails films={film} />
          </div>
        ))}
      </div>
      <button className="bg-slate-50 mr-4" onClick={fetchPreviousPage} disabled={currentPage <= 0}>
        Previous
      </button>
      <button className="bg-slate-50 mr-4" onClick={fetchNextPage}>
        Next
      </button>
    </div>
  );
};

export default Films;
