import { useSelector } from "react-redux";
import CardTestimonial from "../testimonial/CardTestimonial";
import FilmsDetails from "../Films/FilmsDetails";
import { useState } from "react";
import Pagination from "../Films/Pagination";

const BookMarked = () => {
  const bookedFilm = useSelector((state) => state.films.markedFilms);
  console.log('bookedFilm iz selectora', bookedFilm);
  
  const [currentPage, setCurrentPage] = useState(1);
  const filmsPerPage = 12; 

  const indexOfLastFilm = currentPage * filmsPerPage; 
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage; 
  console.log(indexOfFirstFilm)
  console.log(indexOfFirstFilm)
  
  const currentFilms = bookedFilm.slice(indexOfFirstFilm, indexOfLastFilm);

  const handleNextMarkedFilms = () => {
    if (indexOfLastFilm < bookedFilm.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousMarkedFilms = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="max-w-[71rem] mx-auto mt-14">
      <div className="grid grid-cols-4 gap-6">
        {currentFilms.length > 0 ? (
          currentFilms.map((film) => (
            <div key={film.id} className="flex flex-col">
              <CardTestimonial key={film.id2} testimonialFilms={film} />
              <FilmsDetails films={film} />
            </div>
          ))
        ) : (
          <p className="text-center pl-12 text-xl text-gray-400">No marked films.</p>
        )}
      </div>
      <div className="flex justify-between mt-4">
        {/* <button onClick={handlePreviousMarkedFilms} disabled={currentPage === 1} className="bg-blue-500 text-white px-4 py-2 rounded">
          Previous
        </button>
        <button onClick={handleNextMarkedFilms} disabled={indexOfLastFilm >= bookedFilm.length} className="bg-blue-500 text-white px-4 py-2 rounded">
          Next
        </button> */}
        <Pagination
       fetchNextPage={handleNextMarkedFilms}
       fetchPreviousPage={handlePreviousMarkedFilms}
       totalItems={bookedFilm.length}
       itemsPerPage={filmsPerPage}
        />
      </div>
    </div>
  );
};

export default BookMarked;
