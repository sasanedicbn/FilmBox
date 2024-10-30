import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Button from "../../UI/Button";
import PaginationWrapper from "../../UI/PaginationWrapper";
import CardTestimonial from "../testimonial/CardTestimonial";
import FilmsDetails from "../Films/FilmsDetails";
import LengthPagination from "../../UI/LengthPagination";
import { Film } from "../../../types/types";
import { toast } from "react-toastify";
import { auth, db } from "../../../config/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/slices/filmsSlice";

const BookMarked = () => {
  const currentUser = auth.currentUser;
  const [bookedFilm, setBookedFilm] = useState<Film[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const searchTerm = useSelector((state: RootState) => state.films.searchTerm);
  const genre = useSelector((state: RootState) => state.films.currentGenre); 
  
  const filteredFilms = bookedFilm.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const genreFilteredFilms = genre ? filteredFilms.filter((film) => film.genre.includes(genre)) : filteredFilms

  const filmsPerPage = 12;
  const paginationFilms = Math.ceil(genreFilteredFilms.length / filmsPerPage);
  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;

  const currentFilms = genreFilteredFilms.slice(indexOfFirstFilm, indexOfLastFilm);

  useEffect(() => {
    const fetchBookmarkedFilms = async () => {
      if (!currentUser) {
        toast.error("You need to be logged in to view your bookmarks.");
        return;
      }

      try {
        const userId = currentUser.uid;
        const collectionRef = collection(db, "users", userId, "bookmarkedFilms");
        const querySnapshot = await getDocs(collectionRef);

        const filmsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Film[];

        setBookedFilm(filmsData);
      } catch (error) {
        console.error("Error fetching bookmarked films:", error);
        toast.error("Error fetching bookmarked films.");
      }
    };

    fetchBookmarkedFilms();
  }, [currentUser]);

  const handleNextMarkedFilms = () => {
    if (indexOfLastFilm < genreFilteredFilms.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousMarkedFilms = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  console.log('booked Film', bookedFilm);
  return (
    <div className="max-w-[71rem] mx-auto mt-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentFilms.length > 0 ? (
          currentFilms.map((film: Film) => (
            <div key={film.id} className="flex flex-col">
              <CardTestimonial testimonialFilms={film} />
              <FilmsDetails films={film} />
            </div>
          ))
        ) : (
          <p className="text-center pl-12 text-xl text-gray-400">No marked films.</p>
        )}
      </div>
      <PaginationWrapper type="smallNumberPagination">
        <Button onClick={handlePreviousMarkedFilms} disabled={currentPage === 1} type="pagination">
          <AiOutlineLeft />
        </Button>
        <LengthPagination
          lengthPagination={paginationFilms}
          activePage={currentPage}
          handlePageChange={setCurrentPage}
        />
        <Button onClick={handleNextMarkedFilms} disabled={indexOfLastFilm >= genreFilteredFilms.length} type="pagination">
          <AiOutlineRight />
        </Button>
      </PaginationWrapper>
    </div>
  );
};

export default BookMarked;
