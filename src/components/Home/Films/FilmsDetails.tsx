import { FaStar } from "react-icons/fa"; // Import star icon from react-icons

const FilmsDetails = ({ films }) => {
  return (
    <div className="py-2 mx-auto w-[218px] text-white  shadow-lg ">
      {/* Film title */}
      <p className="text-[14px] font-semibold">{films.title.toUpperCase()}</p>

      <div className="flex items-center justify-between text-sm text-gray-400">
        {/* Year and Rating */}
        <p className="flex items-center">
          <span>{films.year}</span>
          {/* Gold Star Icon using react-icons */}
          <FaStar className="w-5 h-5 text-yellow-500 mx-2" />
          <span className="ml-1">{films.rating}</span>
        </p>

        {/* Genre */}
      </div>
      <p className="font-semibold text-gray-200  text-[14px] flex justify-between text-sm bg-gray-700 px-3 py-1 rounded-lg">{films.genre.join(', ')}</p>
    </div>
  );
};

export default FilmsDetails;
