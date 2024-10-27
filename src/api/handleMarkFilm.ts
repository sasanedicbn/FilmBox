import { toast } from "react-toastify";
import { auth, db } from "../config/firebase";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { Film } from "../types/types";

export const handleMarkFilm = async (films: Film) => {
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      toast.error("You have to be logged in.");
      return;
    }
  
    try {
      const userId = currentUser.uid;
      const filmRef = doc(db, "users", userId, "bookmarkedFilms", films.id);
      
      const filmSnapshot = await getDoc(filmRef);
  
      if (filmSnapshot.exists()) {
        await deleteDoc(filmRef);
        toast.error("Film is deleted from marked.");
      } else {
        await setDoc(filmRef, films);
        toast.success("Film is successfully added in marked.");
      }
    } catch (error) {
      toast.error("Error tagging or untag a movie.");
    }
  };