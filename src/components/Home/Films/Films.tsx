import { useEffect, useState } from "react";
import CardTestimonial from "../testimonial/CardTestimonial";
import FilmsDetails from "./FilmsDetails";
import { collection, endBefore, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setFilms } from "../../../store/slices/filmsSlice";

const Films = () => {
  // const [films, setFilms] = useState([]); 
  const [currentPage, setCurrentPage] = useState(null)
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null)
  const films = useSelector(state => state.films.films)
  const dispatch = useDispatch()

  const fetchMovies = async (startAfterDoc = null, previous = false) => {
    const coll = collection(db, "films");

    const moviesQuery = startAfterDoc 
      ? query(coll, orderBy('rating', "desc"), previous ? endBefore(startAfterDoc) : startAfter(startAfterDoc), limit(12)) 
      : query(coll, orderBy('rating', "desc"), limit(12));

      // ove dvije const orderBy i limit u const prebaciti
      // mzd br pagininacije x maxmovies num
    const data = await getDocs(moviesQuery);

    if (data.empty) {
      console.log('Nema više podataka');
      return;
    }

    const movies = data.docs.map((doc) => ({ id2: doc.id, ...doc.data() }));
    // console.log('da li je da id2', movies.map((movie) => movie.id2))
    dispatch(setFilms(movies)); 

    const lastVisibleRef = data.docs[data.docs.length - 1];
    setLastVisible(lastVisibleRef);

    const firstVisibleRef = data.docs[0]
    setFirstVisible(firstVisibleRef)
    // console.log('data.docs[0]', data.docs[0])

    // console.log('movies', movies);
    // console.log('firstFilms', firstVisible);
  };
  console.log('ovo gledaj za id2', films.map((film) => film.id2))
  const fetchNextPage = async () => {
    if (!lastVisible) return; 
    await fetchMovies(lastVisible); 
    setCurrentPage(currentPage + 1)
  };

  const fetchPreviousPage = async () => {
    if(!firstVisible) return
    console.log('firstVisible iz funckije gdje ide doma', firstVisible.id2)
    await fetchMovies(firstVisible, true)
    setCurrentPage(currentPage + 1)
  }
  

  useEffect(() => {
    fetchMovies(); 
    setCurrentPage(1)
  }, []);

  return (
    <div className="max-w-[71rem] mx-auto mt-14">
      <div className="grid grid-cols-4 gap-6">
        {films.map((film) => (
          <div key={film.id2} className="flex flex-col">
            <CardTestimonial testimonialFilms={film} />
            <FilmsDetails films={film} />
          </div>
        ))}
      </div>
      <button className="bg-slate-50 mr-4" onClick={fetchPreviousPage}>
        Previous
      </button>
      <button className="bg-slate-50 mr-4" onClick={fetchNextPage}>
        Next
      </button>
   
    </div>
  );
};

export default Films;

