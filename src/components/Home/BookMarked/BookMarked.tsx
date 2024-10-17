import { useSelector } from "react-redux";
import CardTestimonial from "../testimonial/CardTestimonial";
import FilmsDetails from "../Films/FilmsDetails";
import { useState } from "react";
import LengthPagination from "../../UI/LengthPagination";

const BookMarked = () => {
  const bookedFilm = useSelector((state) => state.films.markedFilms);
  console.log('bookedFilm iz selectora', bookedFilm);
  
  const [currentPage, setCurrentPage] = useState(1); 
  const filmsPerPage = 12; 
  const paginationFilms = Math.ceil(bookedFilm.length / filmsPerPage);

  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  
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
              <CardTestimonial testimonialFilms={film} />
              <FilmsDetails films={film} />
            </div>
          ))
        ) : (
          <p className="text-center pl-12 text-xl text-gray-400">No marked films.</p>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousMarkedFilms}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <LengthPagination
          lengthPagination={paginationFilms}
          activePage={currentPage}
          handlePageChange={setCurrentPage}
        />
        <button
          onClick={handleNextMarkedFilms}
          disabled={indexOfLastFilm >= bookedFilm.length}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookMarked;

