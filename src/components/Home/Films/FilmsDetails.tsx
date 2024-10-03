import { FaStar } from "react-icons/fa";

const FilmsDetails = ({ films }) => {
  return (
    <div className="py-2 mx-auto w-[218px] text-white  shadow-lg ">
      <p className="text-[14px] font-semibold">{films.title.toUpperCase()}</p>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <p className="flex items-center">
          <span>{films.year}</span>
          <FaStar className="w-5 h-5 text-yellow-500 mx-2" />
          <span className="ml-1">{films.rating}</span>
        </p>
      </div>
      <p className="font-semibold text-gray-200 mt-3 text-sm bg-gray-700 px-3 py-1 rounded-lg">{films.genre.join(', ')}</p>
    </div>
  );
};

export default FilmsDetails;
