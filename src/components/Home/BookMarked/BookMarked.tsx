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


const BookMarked = () => {
  const currentUser = auth.currentUser;
  const [bookedFilm, setBookedFilm] = useState<Film[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filmsPerPage = 12;
  const searchTerm = useSelector((state) => state.films.searchTerm);

  const paginationFilms = Math.ceil(bookedFilm.length / filmsPerPage);
  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;

  const filteredFilms = bookedFilm.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentFilms = filteredFilms.slice(indexOfFirstFilm, indexOfLastFilm);

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
    if (indexOfLastFilm < filteredFilms.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousMarkedFilms = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="max-w-[71rem] mx-auto mt-14">
      <div className="grid grid-cols-4 gap-6">
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
        <Button onClick={handleNextMarkedFilms} disabled={indexOfLastFilm >= filteredFilms.length} type="pagination">
          <AiOutlineRight />
        </Button>
      </PaginationWrapper>
    </div>
  );
};

export default BookMarked;
