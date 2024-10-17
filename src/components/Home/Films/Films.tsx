import CardTestimonial from "../testimonial/CardTestimonial";
import FilmsDetails from "./FilmsDetails";
import Pagination from "./Pagination";
import useFilmsPagination from "../../custom-hook/useFilmsPagination";
import { useSelector } from "react-redux";

const Films = () => {
  const films = useSelector((state) => state.films.films);

  const { fetchNextPage, fetchPreviousPage, fetchPage } = useFilmsPagination();

  return (
    <div className="max-w-[71rem] mx-auto mt-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {films.map((film) => (
          <div key={film.id} className="flex flex-col">
            <CardTestimonial testimonialFilms={film} />
            <FilmsDetails films={film} />
          </div>
        ))}
      </div>
      <Pagination
        fetchNextPage={fetchNextPage}
        fetchPreviousPage={fetchPreviousPage}
        fetchPage={fetchPage}
      />
    </div>
  );
};

export default Films;

