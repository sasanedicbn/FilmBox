import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../config/firebase";
import Icon from "./Icon";
import { Film } from "../../types/types";

const HoverComponent = ({ films }: { films: Film }) => {
  const currentUser = auth.currentUser; 

  const handleMarkFilm = async () => {
    if (!currentUser) {
      toast.error("You need to be logged in to bookmark films.");
      return;
    }

    try {
      const userId = currentUser.uid; 
      console.log(userId)
      const filmRef = doc(db, "users", userId, "bookmarkedFilms", films.id);
      
      const filmSnapshot = await getDoc(filmRef); 

      if (filmSnapshot.exists()) {
        await deleteDoc(filmRef);
        toast.error("Film removed from bookmarks.");
      } else {
        await setDoc(filmRef, films);
        toast.success("Film bookmarked successfully.");
      }
    } catch (error) {
      toast.error("Error bookmarking or unbookmarking film.");
    }
  };

  return (
    <div className="w-[220px] mx-auto absolute inset-0 bg-slate-400 pointer bg-opacity-60 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 p-2">
      <div className="text-center">
        <span className="absolute top-2 
  );
};

export default HoverComponent;
