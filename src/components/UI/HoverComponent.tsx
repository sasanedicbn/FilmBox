import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Film } from "../../types/types";
import { handleMarkFilm } from "../../api/handleMarkFilm";
import { fetchFilmById } from "../../api/fetchFilmById";

const HoverComponent = ({ films }: { films: Film }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-[220px] mx-auto absolute inset-0 bg-slate-400 pointer bg-opacity-60 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 p-2">
      <div className="text-center">
        <span className="absolute top-2 right-2">
          <Icon name="marked" size={30} color="white" onClick={handleMarkFilm} type="pointer" />
        </span>
        <button
          className="mt-4 text-gray-600 flex gap-2 items-center justify-center cursor-pointer bg-gray-300 bg-opacity-80 py-2 px-3 rounded-2xl hover:bg-gray-200 font-semibold transition-all duration-300"
          onClick={() => fetchFilmById(films.id2, navigate, dispatch)}
        >
          See more <span><Icon name="search" size={15} color="gray" /></span>
        </button>
      </div>
    </div>
  );
};

export default HoverComponent;
