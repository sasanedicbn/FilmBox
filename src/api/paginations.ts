import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";

export const fetchPagination = async (setFirstVisible, setLastVisible) => {
    const coll = collection(db, "films");
    const moviesQuery = query(coll, orderBy('rating', 'desc'), limit(12));
  
    const data = await getDocs(moviesQuery);
  
    const movies = data.docs.map((doc) => ({ id2: doc.id, ...doc.data() }));
  
    const lastVisibleRef = data.docs[data.docs.length - 1];
    setLastVisible(lastVisibleRef);
  
    const firstVisibleRef = data.docs[0];
    setFirstVisible(firstVisibleRef);
  
    return movies;
  };
  