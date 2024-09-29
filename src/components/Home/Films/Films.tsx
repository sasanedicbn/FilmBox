import { useEffect, useState } from "react";
import CardTestimonial from "../testimonial/CardTestimonial";
import { paginations } from "../../../api/paginations";
import Pagination from "./Pagination";
import FilmsDetails from "./FilmsDetails";

const Films = () => {
  const [films, setFilms] = useState([]); 

  const fetchFilms = async (page) => {
    const filmsData = await paginations();  
    setFilms(filmsData);
  };
  useEffect(() => {
    paginations()
  }, [])

  return (
    <div className="max-w-[71rem] mx-auto mt-14  ">
      <div className="grid grid-cols-4 gap-6"> 
        {films.map((film) => (
          <div key={film.id2} className="flex flex-col "> 
            <CardTestimonial testimonialFilms={film} /> 
            <FilmsDetails films={film} />
          </div>
        ))}
      </div>
      <Pagination fetchFilms={fetchFilms} /> 
    </div>
  );
};

export default Films;
