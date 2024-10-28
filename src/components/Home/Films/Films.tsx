import CardTestimonial from "../testimonial/CardTestimonial";
import FilmsDetails from "./FilmsDetails";
import Pagination from "./Pagination";
import useFilmsPagination from "../../custom-hook/useFilmsPagination";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/slices/filmsSlice";
import { Film } from "../../../types/types";
import Button from "../../UI/Button";
import useFilmsGenre from "../../custom-hook/useFilmsGenre";

const Films = () => {
  const films = useSelector((state:RootState) => state.films.films);
  const genre = useSelector((state) => state.films.currentGenre)
  const {totalCount} = useFilmsGenre()
  console.log(films, 'availableFilms')

  const { fetchNextPage, fetchPreviousPage, fetchPage, } = useFilmsPagination();
  const {fetchSortedFilms} = useFilmsGenre()

  return (
    <div className="max-w-[71rem] mx-auto mt-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {films.map((film:Film) => (
          <div key={film.id} className="flex flex-col">
            <CardTestimonial testimonialFilms={film} />
            <FilmsDetails films={film} />
          </div>
        ))}
      </div>
      {genre ?
        <div className="flex justify-center my-4" >
         <Button type="upload" disabled={films.length === totalCount} onClick={() => fetchSortedFilms(true)}>{`Upload more ${genre.toLowerCase()} movies`}</Button>
       </div>
        : (
          <Pagination
          fetchNextPage={fetchNextPage}
          fetchPreviousPage={fetchPreviousPage}
          fetchPage={fetchPage}
        />
      )}
    </div>
  );
};

export default Films;

