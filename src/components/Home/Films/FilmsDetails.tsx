import { FaStar } from "react-icons/fa"; // Import star icon from react-icons

const FilmsDetails = ({ films }) => {
  return (
    <div className="mt-2  p-4 w-full bg-gray-800 text-white rounded-lg shadow-lg space-y-2">
      {/* Film title */}
      <p className="text-1xl font-semibold">{films.title}</p>

      <div className="flex items-center justify-between text-sm text-gray-400">
        {/* Year and Rating */}
        <p className="flex items-center">
          <span>{films.year}</span>
          {/* Gold Star Icon using react-icons */}
          <FaStar className="w-5 h-5 text-yellow-500 mx-2" />
          <span className="ml-1">{films.rating}</span>
        </p>

        {/* Genre */}
        <p className="font-semibold text-gray-300">{films.genre}</p>
      </div>
    </div>
  );
};

export default FilmsDetails;
