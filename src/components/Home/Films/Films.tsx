import { useEffect, useState } from "react";
import CardTestimonial from "../testimonial/CardTestimonial";
import FilmsDetails from "./FilmsDetails";
import { collection, endBefore, getDocs, limit, query, startAfter } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setFilms } from "../../../store/slices/filmsSlice";

const Films = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const films = useSelector(state => state.films.films);
  const dispatch = useDispatch();

  const fetchNextPage = async () => {
    const coll = collection(db, "films");
  
    const moviesQuery = lastVisible 
      ? query(coll, startAfter(lastVisible), limit(12))
      : query(coll, limit(12)); 
  
    const data = await getDocs(moviesQuery);
  
    if (data.empty) {
      console.log('Nema više podataka');
      return;
    }
  
    const movies = data.docs.map((doc) => ({ id2: doc.id, ...doc.data() }));
    // console.log('prvi okret ->>>>', movies);
  
    dispatch(setFilms(movies)); 
  
    const lastVisibleRef = data.docs[data.docs.length - 1]; 
    setLastVisible(lastVisibleRef);
  
    const firstVisibleRef = data.docs[0]; 

    setFirstVisible(firstVisibleRef);
  
    setCurrentPage((currentPage) => currentPage + 1);
  };

  console.log('firstvisible', firstVisible?.id)
  const fetchPreviousPage = async () => {
    if (!firstVisible) return; 

    const coll = collection(db, "films");
    const moviesQuery = query(coll, endBefore(firstVisible), limit(12)); 

    const data = await getDocs(moviesQuery);

    if (data.empty) {
      console.log('Nema više podataka');
      return;
    }

    const movies = data.docs.map((doc) => ({ id2: doc.id, ...doc.data() }));

    dispatch(setFilms(movies));

    const lastVisibleRef = data.docs[data.docs.length - 1]; 
    setLastVisible(lastVisibleRef);

    const firstVisibleRef = data.docs[0]; 
    setFirstVisible(firstVisibleRef);

    setCurrentPage((currentPage) => currentPage - 1); 
  };

  useEffect(() => {
    fetchNextPage(); 
  }, []);

  return (
    <div className="max-w-[71rem] mx-auto mt-14">
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6">
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

// LEARNING ABOUT CLOUSERS  