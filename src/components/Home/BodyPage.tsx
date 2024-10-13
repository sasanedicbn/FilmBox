import Input from "../UI/Input";
import Icon from "../UI/Icon";
import Select from "../UI/Select";
import Option from "../UI/Option";
import { BodyPageProps } from "../../types/types";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilms } from "../../store/slices/filmsSlice";

const BodyPage = ({ openClickedFilms, openFilms }: BodyPageProps) => {
  const [genre, setGenre] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useDispatch();

  const fetchSortedFilms = async () => {
    try {
      const filmsRef = collection(db, "films");

      let q;

      if (genre === "all") {
        q = query(filmsRef, orderBy("title", "asc"));
      } else {
        q = query(
          filmsRef,
          where("genre", "array-contains", genre), 
          orderBy("genre")
        );
      }

      const querySnapshot = await getDocs(q);
      const filteredFilms = querySnapshot.docs
        .map((doc) => {
          const filmData = doc.data();
          return {
            id: doc.id,
            ...filmData,
          };
        })
        .filter((film) =>
          film.title.toLowerCase().includes(searchTerm.toLowerCase()) 
        );

      dispatch(setFilms(filteredFilms));
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = e.target.value;
    setGenre(selectedGenre);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); 
  };

  useEffect(() => {
    fetchSortedFilms(); 
  }, [genre, searchTerm]); 

  return (
    <div className="bg-gray-800 mx-auto flex items-center justify-between max-w-[68rem] mt-24 p-4 rounded-lg">
      <Input
        type="text"
        name="searchFilms"
        placeholder="Search films..."
        onChange={handleSearchChange} 
        styleType="searchFilms"
        value={searchTerm} 
      />

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
