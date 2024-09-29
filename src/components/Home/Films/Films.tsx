import { useEffect, useState } from "react";
import CardTestimonial from "../testimonial/CardTestimonial";
import { paginations } from "../../../api/paginations";
import Pagination from "./Pagination";
import FilmsDetails from "./FilmsDetails";
import { collection,  getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../../config/firebase";
const Films = () => {
  const [films, setFilms] = useState([]); 
  const [activeIndex, setActiveIndex] = useState(0)
  const [firstVisible, setFirstVisible] = useState(null)
  const [lastVisible, setLastVisible] = useState(null)


  const fetchNextPage = () => {
     
  }

  const fetchFilms = async () => {
    const filmsData = await paginations();  
    setFilms(filmsData);
  };

async function fetchInitailMovies () {
  const coll = collection(db, "films");
  const initialQuery = query(coll, orderBy('rating', "desc"), limit(12))
  const data = await getDocs(initialQuery)
  const movies = data.docs.map((doc) => doc.data() )
  setFilms(movies)
  console.log('data', data.docs[0])
  const firstVisibleRef = data.docs[0]
  const lastVisibleRef = data.docs[data.docs.length - 1]
  setFirstVisible(firstVisibleRef)
  setLastVisible(lastVisibleRef)
  // setFirstVisible(data.docs[0])
  // setLastVisible(data.docs[data.docs.length - 1])
  
  console.log(movies, 'movies')
}
useEffect(() => {
  fetchInitailMovies()
  
  console.log(firstVisible, 'firstVisible')
  console.log(lastVisible, 'lastVisible')
}, [])
  return (
    <div className="max-w-[71rem] mx-auto mt-14  ">
      <div className="grid grid-cols-4 gap-6"> 
        {films.map((film) => (
          <div key={film.id} className="flex flex-col "> 
            <CardTestimonial testimonialFilms={film} /> 
            <FilmsDetails films={film} />
          </div>
        ))}
      </div>
      <button className="bg-slate-50 mr-4">Next</button>
      <button className="bg-slate-200">Prev</button>
      {/* <Pagination fetchFilms={fetchFilms} />  */}
    </div>
  );
};

export default Films;
