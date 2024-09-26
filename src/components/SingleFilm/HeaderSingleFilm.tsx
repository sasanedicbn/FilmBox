import { useSelector } from "react-redux";

const HeaderSingleFilm = () => {
  const film = useSelector((state) => state.films?.currentFilm); 

  return (
    <div className="flex justify-between mt-4">
      <div className="text-left">
        <h3 className="text-1xl font-bold uppercase">{film.title}</h3>
        <p className="text-md text-gray-400">({film.year})</p>
      </div>
       <div className="text-right flex">
        <p className="text-gray-300 w-[100%]">IMDb Rating: <span className="font-semibold">{film.rating}/10</span></p>
        <p className="text-gray-300 w-[100%]">Rank: <span className="font-semibold w-[100%]">{film.rank}/100</span></p>
      </div>
    </div>
  );
};

export default HeaderSingleFilm;
{/* <FaStar color="gold" size={24} />  */}
