import Input from "../UI/Input";
import Icon from "../UI/Icon";
import Select from "../UI/Select";
import Option from "../UI/Option";
import { BodyPageProps } from "../../types/types";
import useFilmsGenre from "../custom-hook/useFilmsGenre";

const BodyPage = ({ openClickedFilms, openFilms }: BodyPageProps) => {
  const {
    genre,
    searchTerm,
    handleGenreChange,
    handleSearchChange,
  } = useFilmsGenre();

  return (
    <div className="bg-gray-800 mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:max-w-[68rem] mt-24 p-4 rounded-lg">
      <Input
        type="text"
        name="searchFilms"
        placeholder="Search films..."
        onChange={(e) => handleSearchChange(e.target.value)} 
        styleType="searchFilms"
        value={searchTerm}
      />
      <div className="flex items-center gap-4">
        <Select
          name="genreSelect"
          onChange={(e) => handleGenreChange(e.target.value)}
          value={genre}
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
