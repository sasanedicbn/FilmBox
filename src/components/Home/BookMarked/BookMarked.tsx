import { useSelector } from "react-redux";
import CardTestimonial from "../testimonial/CardTestimonial";
import FilmsDetails from "../Films/FilmsDetails";
import Pagination from "../Films/Pagination";
import useFilmsPagination from "../../custom-hook/useFilmsPagination";

const BookMarked = () => {
  const bookedFilm = useSelector((state) => state.films.markedFilms);
  console.log('bookedFilm iz selectora', bookedFilm);
 
  const {fetchPage,fetchNextPage, fetchPreviousPage,} = useFilmsPagination()

  return (
    <div className="max-w-[71rem] mx-auto mt-14">
      <div className="grid grid-cols-4 gap-6 ">
        {bookedFilm.length > 0 ? (
          bookedFilm.map((film) => (
            <div key={film.id} className="flex flex-col">
             <CardTestimonial key={film.id2} testimonialFilms={film} />
             <FilmsDetails films={film} />
            </div>
          ))
        ) : (
          <p className="text-center pl-12 text-xl text-gray-400">No marked films.</p>
        )}
      </div>
      <Pagination fetchNextPage={fetchNextPage} fetchPage={fetchPage} fetchPreviousPage={fetchPreviousPage}/>
    </div>
  );
};

export default BookMarked;
