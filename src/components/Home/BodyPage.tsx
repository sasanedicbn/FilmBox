import Input from "../UI/Input";
import Icon from "../UI/Icon";
import Select from "../UI/Select";
import Option from "../UI/Option";
import { BodyPageProps } from "../../types/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../config/firebase";


const BodyPage = ({ openClickedFilms, openFilms }: BodyPageProps) => {
  const fetchSortedFilms = async () => {
   try{
    const filmsRef = collection(db, 'films')

    const q = query(filmsRef, orderBy("action", "drama", 'comedy'), orderBy("createdAt", "desc"));
    
    const querySnapshot = await getDocs(q);

   } catch(error){
    console.log(error)
   }
  }
  
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
          onChange={(e) => console.log(e.target.value)}
        >
          <Option value="all">All</Option>
          <Option value="action">Action</Option>
          <Option value="drama">Drama</Option>
          <Option value="comedy">Comedy</Option>
          <Option value="horror">Horror</Option>
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
