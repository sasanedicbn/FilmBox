import { useSelector } from "react-redux";
import { RootState } from "../../store/slices/filmsSlice";
import { Film } from "../../types/types";

const HeaderSingleFilm = () => {
  const film = useSelector((state: RootState) => state.films?.currentFilm) as Film | null;

  if (!film) {
    return <p>Film details not available.</p>;
  }

  return (
    <div className="flex justify-between mt-4">
      <div className="text-left">
        <h3 className="text-1xl font-bold uppercase">{film.title}</h3>
        <p className="text-md text-gray-400">({film.year})</p>
      </div>
      <div className="text-right">
        <p className="text-gray-300">
          IMDb Rating: <span className="font-semibold">{film.rating}/10</span>
        </p>
        <p className="text-gray-300">
          Rank: <span className="font-semibold w-[100%]">{film.rank}/100</span>
        </p>
      </div>
    </div>
  );
};

export default HeaderSingleFilm;
