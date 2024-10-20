import { toast } from "react-toastify";
import Icon from "./Icon";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentFilm, addMarketFilms } from "../../store/slices/filmsSlice"; 
import { Film } from "../../types/types";
const HoverComponent = ({ films }: { films: Film }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchFilmById = async (filmId: string) => {
    try {
      let filmRef = doc(db, "films", filmId);
      let filmSnap = await getDoc(filmRef);
  
      if (!filmSnap.exists()) {
        filmRef = doc(db, "testimonialFilms", filmId);
        filmSnap = await getDoc(filmRef);
      }
  
      if (filmSnap.exists()) {
        const filmData = { id2: filmSnap.id, ...filmSnap.data() };
        dispatch(setCurrentFilm(filmData));
        navigate(`/home/${filmId}`);
        return filmData;
      } else {
        toast.error("Film not found.");
        return null;
      }
    } catch (error) {
      toast.error("Error fetching film.");
      return null;
    }
  };
  

  const handleMarkFilm = () => {
    dispatch(addMarketFilms(films)); 
  };

  return (
    <div className="w-[220px] mx-auto absolute inset-0  bg-slate-400 pointer bg-opacity-60 flex flex-col  justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300  p-2">
      <div className="text-center">
        <span className="absolute top-2 right-2">
          <Icon name="marked" size={30} color="white" onClick={handleMarkFilm} type="pointer"/> 
        </span>
        <p
          className="mt-4 text-gray-600 flex gap-2 items-center justify-center cursor-pointer bg-gray-300 bg-opacity-80 py-2 px-3 rounded-2xl hover:bg-gray-200 font-semibold transition-all duration-300"
          onClick={() => fetchFilmById(films.id2)}
        >
          See more <span><Icon name="search" size={15} color="gray" onClick={() => fetchFilmById(films.id2)} type="pointer"/></span>
        </p>
      </div>
    </div>
  );
};

export default HoverComponent;
