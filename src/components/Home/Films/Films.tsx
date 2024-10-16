import { useEffect, useState } from "react";
import CardTestimonial from "../testimonial/CardTestimonial";
import FilmsDetails from "./FilmsDetails";
import { collection, endAt, endBefore, getDocs, limit, limitToLast, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setFilms } from "../../../store/slices/filmsSlice";
import { fetchPagination } from "../../../api/paginations";
import Pagination from "./Pagination";

const Films = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const films = useSelector(state => state.films.films);
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
      orderBy('rating', 'desc'),
      limit(12),
      startAfter(offset > 0 ? lastVisible : null) 
    );
  
    const data = await getDocs(moviesQuery);
    if (data.empty) {
      console.log('Nema više podataka');
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
  
    const moviesQuery =  query(coll, orderBy('rating', 'desc'), startAfter(lastVisible), limit(12))
  
    const data = await getDocs(moviesQuery);
  
    if (data.empty) {
      console.log('Nema više podataka');
      return;
    }
  
    const movies = data.docs.map((doc) => ({ id2: doc.id, ...doc.data()}));
    dispatch(setFilms(movies)); 
  
    const lastVisibleRef = data.docs[data.docs.length - 1]; 
    setLastVisible(lastVisibleRef);
  
    const firstVisibleRef = data.docs[0]; 
    setFirstVisible(firstVisibleRef);
  
    setCurrentPage((currentPage) => currentPage + 1);
  };


  const fetchPreviousPage = async () => {
    if (!firstVisible) return; 

    const coll = collection(db, "films");
    const moviesQuery = query(coll, orderBy('rating', 'desc'), endBefore(firstVisible), limitToLast(12)); 

    const data = await getDocs(moviesQuery);

    if (data.empty) {
      console.log('Nema više podataka');
      return;
    }

    const movies = data.docs.map((doc) => ({ id2: doc.id, ...doc.data()}));
    console.log('movies', movies)
    dispatch(setFilms(movies));

    const lastVisibleRef = data.docs[data.docs.length - 1]; 
    setLastVisible(lastVisibleRef);

    const firstVisibleRef = data.docs[0]; 
    setFirstVisible(firstVisibleRef);

    setCurrentPage((currentPage) => currentPage - 1); 
  };

  useEffect(() => {
    fetchPaginations()
  }, []);

  return (
    <div className="max-w-[71rem] mx-auto mt-14">
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6">
        {films.map((film) => (
          <div key={film.id} className="flex flex-col">
            <CardTestimonial testimonialFilms={film} />
            <FilmsDetails films={film} />
          </div>
        ))}
      </div>
      <Pagination fetchNextPage={fetchNextPage} fetchPreviousPage={fetchPreviousPage} fetchPage={fetchPage}/>
    </div>
  );
};

export default Films;

