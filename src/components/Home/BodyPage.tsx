import Input from "../UI/Input";
import Icon from "../UI/Icon";
import Select from "../UI/Select";
import Option from "../UI/Option";
import { BodyPageProps } from "../../types/types";
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentGenre, setFilms } from "../../store/slices/filmsSlice";
import useFilmsPagination from "../custom-hook/useFilmsPagination";
import store from "../../store/store";


const BodyPage = ({ openClickedFilms, openFilms }: BodyPageProps) => {
  const [genre, setGenre] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [lastVisible, setLastVisible] = useState(null);

  const dispatch = useDispatch();

  const fetchSortedFilms = async (isLoadMore = false) => {
    try {
      const coll = collection(db, "films");
      let q = query(coll, orderBy("rating", "desc"), limit(12)); // Defaultni upit za "all" žanr
  
      // Dodavanje uslova za žanr, ako nije "all"
      if (genre !== "all") {
        q = query(coll, where("genre", "array-contains", genre), orderBy("genre"), limit(12));
      }
  
      // Dodavanje paginacije, ako se učitava sledeća stranica
      if (isLoadMore && lastVisible) {
        q = query(q, startAfter(lastVisible), limit(12));
      }
  
      const querySnapshot = await getDocs(q);
      const filteredFilms = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((film) =>
          film.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
  
      if (isLoadMore) {
        // Dohvati trenutne filmove iz Redux store-a
        const currentFilms = store.getState().films.films;
        // Kombinuj trenutne filmove sa novim
        dispatch(setFilms([...currentFilms, ...filteredFilms]));
      } else {
        dispatch(setFilms(filteredFilms));
      }
  
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastDoc);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };
  
  
  const handleLoadMore = () => {
    // setPage((prevPage) => prevPage + 1);
    fetchSortedFilms(true); // Poziva fetch funkciju sa paginacijom
  };
  

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = e.target.value;
    setGenre(selectedGenre);
    dispatch(setCurrentGenre(selectedGenre))
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); 
  };

  useEffect(() => {
    fetchSortedFilms(); 
  }, [genre, searchTerm]); 

  return (
    <div className="bg-gray-800 mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:max-w-[68rem] mt-24 p-4 rounded-lg">
      <Input
        type="text"
        name="searchFilms"
        placeholder="Search films..."
        onChange={handleSearchChange} 
        styleType="searchFilms"
        value={searchTerm} 
      />
      <button onClick={handleLoadMore}>LOAD</button>

      <div className="flex items-center gap-4">
        <Select
          name="genreSelect"
          onChange={handleGenreChange} 
        >
          <Option value="all">All</Option>
          <Option value="Action">Action</Option>
          <Option value="Drama">Drama</Option>
          <Option value="Comedy">Comedy</Option>
          <Option value="Horror">Horror</Option>
        </Select>
        <Icon
          name="marked"
          size={30}
          color={openFilms ? "grey" : "red"}
          onClick={openClickedFilms}
          type="pointer"
        />
        <Icon
          name="home"
          size={30}
          color={openFilms ? "red" : "grey"}
          onClick={openClickedFilms}
          type="pointer"
        />
      </div>
    </div>
  );
};

export default BodyPage;
