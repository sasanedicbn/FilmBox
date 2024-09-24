import { toast } from "react-toastify";
import Icon from "./Icon";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const HoverComponent = ({films}) => {

    console.log('films', films)
    
    const fetchFilmById = async (filmId) => {
      console.log('filmsID', filmId);
      try {
          const filmRef = doc(db, 'testimonialFilms', filmId);
          console.log('Firestore reference:', filmRef.path);  // Proveri da li je put tačan
          const filmSnap = await getDoc(filmRef);
  
          console.log('filmSnap', filmSnap);
          if (filmSnap.exists()) {
              console.log("Film data:", filmSnap.data());  // Vraća podatke o filmu
              return { id: filmSnap.id, ...filmSnap.data() };
          } else {
              console.log("No such film!");
              return null;
          }
      } catch (error) {
          console.error("Error fetching film:", error);
          toast.error("Error fetching film.");
          return null;
      }
  };
  


    return (
      <div className="absolute  inset-0 bg-slate-400 mx-7 pointer bg-opacity-60 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 p-2">
        <div className="text-center ">
          <span className="absolute top-2 right-2"><Icon name="marked" size={30} color="white" /></span>
          <p className="mt-4 text-gray-600 flex gap-2 items-center justify-center cursor-pointer bg-gray-300 bg-opacity-80 py-2 px-3 rounded-2xl hover:bg-gray-200 font-semibold transition-all duration-300" onClick={() => fetchFilmById(films.id)}>See more <span><Icon name="search" size={15} color="gray" /></span></p>
        </div>
      </div>
    );
  };
  
  export default HoverComponent;