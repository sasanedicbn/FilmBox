import { useSelector } from "react-redux";

const DetailsSingleFilms = () => {
  const film = useSelector((state) => state.films?.currentFilm);

  return (
    <div className="mt-8 text-left">
      <p className="text-lg font-semibold">Genres:</p>
      <div className="flex gap-2 my-2">
        {film.genre?.map((genre, index) => (
          <span key={index} className="text-sm bg-gray-700 px-3 py-1 rounded-lg">{genre}</span>
        ))}
      </div>

      <p className="mt-6 text-lg font-semibold">Description:</p>
      <p className="text-gray-400 mt-2">{film.description}</p>

      <p className="mt-6 text-lg font-semibold">Director:</p>
      <p className="text-gray-400">{film.director.join(", ")}</p>

      <p className="mt-6 text-lg font-semibold">Writers:</p>
      <p className="text-gray-400">{film.writers.join(", ")}</p>
    </div>
  );
};

export default DetailsSingleFilms;
