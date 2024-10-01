import { useSelector } from "react-redux";
import CardTestimonial from "../testimonial/CardTestimonial";

const BookMarked = () => {
  const bookedFilm = useSelector((state) => state.films.markedFilms);
  console.log('bookedFilm iz selectora', bookedFilm);

  return (
    <div className="max-w-[71rem] mx-auto mt-14">
      <div className="grid grid-cols-4 gap-6 ">
        {bookedFilm.length > 0 ? (
          bookedFilm.map((film) => (
            <CardTestimonial key={film.id2} testimonialFilms={film} />
          ))
        ) : (
          <p className="text-center pl-12 text-xl text-gray-400">No marked films.</p>
        )}
      </div>
    </div>
  );
};

export default BookMarked;
