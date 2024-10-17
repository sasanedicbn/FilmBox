import { useSelector } from "react-redux";
import CardTestimonial from "../testimonial/CardTestimonial";
import FilmsDetails from "../Films/FilmsDetails";
import { useState } from "react";
import LengthPagination from "../../UI/LengthPagination";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Button from "../../UI/Button";
import PaginationWrapper from "../../UI/PaginationWrapper";

const BookMarked = () => {
  const bookedFilm = useSelector((state) => state.films.markedFilms);
  
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
      <PaginationWrapper type="smallNumberPagination">
        <Button onClick={handlePreviousMarkedFilms} disabled={currentPage === 1} type="pagination" >
          <AiOutlineLeft />
        </Button>
        <LengthPagination
          lengthPagination={paginationFilms}
          activePage={currentPage}
          handlePageChange={setCurrentPage}
        />
        <Button onClick={handleNextMarkedFilms} disabled={indexOfLastFilm >= bookedFilm.length} type="pagination" >
          <AiOutlineRight />
        </Button>
      </PaginationWrapper>
    </div>
  );
};

export default BookMarked;

