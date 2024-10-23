import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { auth, db } from "../../config/firebase";
import { addMarketFilms } from "../../store/slices/filmsSlice";
import Icon from "./Icon";
import { Film } from "../../types/types";

const HoverComponent = ({ films }: { films: Film }) => {
  const currentUser = auth.currentUser; 
  const dispatch = useDispatch();

  const handleMarkFilm = async () => {
    if (!currentUser) {
      toast.error("You need to be logged in to bookmark films.");
      return;
    }

    try {
      const userId = currentUser.uid; 
      const filmRef = doc(db, "users", userId, "bookmarkedFilms", films.id);

      await setDoc(filmRef, films); 

      toast.success("Film bookmarked successfully.");
    } catch (error) {
      console.error("Error bookmarking film:", error);
      toast.error("Error bookmarking film.");
    }
  };

  return (
    <div className="w-[220px] mx-auto absolute inset-0 bg-slate-400 pointer bg-opacity-60 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 p-2">
      <div className="text-center">
        <span className="absolute top-2 right-2">
          <Icon name="marked" size={30} color="white" onClick={handleMarkFilm} type="pointer" />
        </span>
      </div>
    </div>
  );
};

export default HoverComponent;

