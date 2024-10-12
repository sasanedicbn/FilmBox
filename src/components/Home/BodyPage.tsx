import Input from "../UI/Input";
import Icon from "../UI/Icon";
import Select from "../UI/Select";
import Option from "../UI/Option";
import { BodyPageProps } from "../../types/types";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilms } from "../../store/slices/filmsSlice";

const BodyPage = ({ openClickedFilms, openFilms }: BodyPageProps) => {
  const [genre, setGenre] = useState<string>("all");
  const dispatch = useDispatch();
  const films = useSelector((state) => state.films.films);
  // console.log("films", films);



  const fetchSortedFilms = async () => {
    try {
      const filmsRef = collection(db, "films");

      let q;
     console.log('q', q)
      if (genre === "all") {
        // Ako je žanr "all", prikazujemo sve filmove
        q = query(filmsRef, orderBy("title", "asc"));
      } else {
        // Ako je izabran specifičan žanr, filtriramo prema njemu
        q = query(
          filmsRef,
          where("genre", "array-contains", genre), // Pretpostavimo da polje 'genre' sadrži niz žanrova
          orderBy("title", "desc")
        );
      }

      const querySnapshot = await getDocs(q);
      console.log('querySnapshot', querySnapshot)
      // ovdje mi vraca svih 100 filmova znaci gore se ono ne uradi kako treba
      const filteredFilms = querySnapshot.docs.map((doc) => {
        const filmData = doc.data();
        // console.log("Film data:", filmData);
        return {
          id: doc.id,
          ...filmData,
        };
      });

      // console.log("sortirano kao", genre);
      dispatch(setFilms(filteredFilms));
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  // Funkcija koja se poziva kada se promeni izabrani žanr
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = e.target.value;
    setGenre(selectedGenre);
     fetchSortedFilms(); // Učitaj filmove nakon promene žanra
  };

  return (
    <div className="bg-gray-800 mx-auto flex items-center justify-between max-w-[68rem] mt-24 p-4 rounded-lg">
      <Input
        type="text"
        name="searchFilms"
        placeholder="Search films..."
        onChange={() => {
          console.log("onchange");
        }}
        styleType="searchFilms"
        value=""
      />

      <div className="flex items-center gap-4">
        <Select
          name="genreSelect"
          onChange={handleGenreChange} // Poziva handleGenreChange funkciju prilikom promene
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
