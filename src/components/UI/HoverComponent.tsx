import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../config/firebase";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentFilm } from "../../store/slices/filmsSlice";
import { Film } from "../../types/types";

const HoverComponent = ({ films }: { films: Film }) => {
  const currentUser = auth.currentUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchFilmById = async (filmId: string) => {
    try {
      let filmRef = doc(db, "films", filmId);
      let filmSnap = await getDoc(filmRef);

      if (!filmSnap.exists()) {
        filmRef = doc(db, "testimonialFilms", filmId);
        filmSnap = await getDoc(filmRef);
      }

      if (filmSnap.exists()) {
        const filmData = { id: filmSnap.id, ...filmSnap.data() };
        dispatch(setCurrentFilm(filmData));
        navigate(`/home/${filmId}`);
        return filmData;
      } else {
        toast.error("Film nije pronađen.");
        return null;
      }
    } catch (error) {
      console.error("Greška pri dohvaćanju filma:", error);
      toast.error("Greška pri dohvaćanju filma.");
      return null;
    }
  };

  const handleMarkFilm = async () => {
    if (!currentUser) {
      toast.error("Morate biti prijavljeni kako biste označili film.");
      return;
    }

    try {
      const userId = currentUser.uid;
      const filmRef = doc(db, "users", userId, "bookmarkedFilms", films.id);
      
      const filmSnapshot = await getDoc(filmRef);

      if (filmSnapshot.exists()) {
        await deleteDoc(filmRef);
        toast.error("Film je uklonjen iz oznaka.");
      } else {
        await setDoc(filmRef, films);
        toast.success("Film je uspešno označen.");
      }
    } catch (error) {
      console.error("Greška pri označavanju filma:", error);
      toast.error("Greška pri označavanju ili uklanjanju oznake filma.");
    }
  };

  return (
    <div className="w-[220px] mx-auto absolute inset-0 bg-slate-400 pointer bg-opacity-60 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 p-2">
      <div className="text-center">
        <span className="absolute top-2 right-2">
          <Icon name="marked" size={30} color="white" onClick={handleMarkFilm} type="pointer" />
        </span>
        <button
          className="mt-4 text-gray-600 flex gap-2 items-center justify-center cursor-pointer bg-gray-300 bg-opacity-80 py-2 px-3 rounded-2xl hover:bg-gray-200 font-semibold transition-all duration-300"
          onClick={() => fetchFilmById(films.id2)}
        >
          See more <span><Icon name="search" size={15} color="gray" /></span>
        </button>
      </div>
    </div>
  );
};

export default HoverComponent;
