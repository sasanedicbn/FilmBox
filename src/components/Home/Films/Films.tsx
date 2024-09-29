import { useState } from "react";
import CardTestimonial from "../testimonial/CardTestimonial";
import { paginations } from "../../../api/paginations";
import Pagination from "./Pagination";
import FilmsDetails from "./FilmsDetails";

const Films = () => {
  const [films, setFilms] = useState([]); 
  const [currentPage, setCurrentPage] = useState(0);

  const fetchFilms = async (page) => {
    const filmsData = await paginations(page);  // Pretpostavljam da paginations funkcija prima broj stranice
    setFilms(filmsData);
    setCurrentPage(page); // Ažurira trenutnu stranicu
  };

  return (
    <div className="max-w-[71rem] mx-auto mt-14  ">
      <div className="grid grid-cols-4 gap-6"> {/* Dodato gap-6 za razmak između kartica */}
        {films.map((film) => (
          <div key={film.id2} className="flex flex-col "> {/* Flex i w-full za ujednačenu širinu */}
            <CardTestimonial testimonialFilms={film} /> 
            <FilmsDetails films={film} />
          </div>
        ))}
      </div>
      <Pagination fetchFilms={fetchFilms} currentPage={currentPage} /> 
    </div>
  );
};

export default Films;
