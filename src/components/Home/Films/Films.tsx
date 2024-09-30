import { useEffect, useState } from "react";
import CardTestimonial from "../testimonial/CardTestimonial";
import FilmsDetails from "./FilmsDetails";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../../../config/firebase";

const Films = () => {
  const [films, setFilms] = useState([]); 
  const [lastVisible, setLastVisible] = useState(null);

  const fetchMovies = async (startAfterDoc = null) => {
    const coll = collection(db, "films");

    const moviesQuery = startAfterDoc 
      ? query(coll, orderBy('rating', "desc"), startAfter(startAfterDoc), limit(12)) 
      : query(coll, orderBy('rating', "desc"), limit(12));

      // ove dvije const orderBy i limit u const prebaciti
      // mzd br pagininacije x maxmovies num
    const data = await getDocs(moviesQuery);

    if (data.empty) {
      console.log('Nema više podataka');
      return;
    }

    const movies = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setFilms(movies); 

    const lastVisibleRef = data.docs[data.docs.length - 1];
    setLastVisible(lastVisibleRef);

    console.log('movies', movies);
    console.log('lastFilms', lastVisibleRef);
  };

  const fetchNextPage = async () => {
    if (!lastVisible) return; 
    await fetchMovies(lastVisible); 
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
      <button className="bg-slate-50 mr-4" onClick={fetchNextPage}>
        Next
      </button>
    </div>
  );
};

export default Films;

