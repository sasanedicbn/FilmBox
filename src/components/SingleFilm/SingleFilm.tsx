import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import HeaderSingleFilm from './HeaderSingleFilm';
import DetailsSingleFilms from './DetailsSingleFilm';

const SingleFilm = () => {
  const film = useSelector((state) => state.films?.currentFilm); 
  console.log('single Film', film);

  if (!film) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-gray-900 min-h-screen flex flex-col items-center justify-start text-white px-4'>
      <div className="w-full max-w-[940px]"> 
        <HeaderSingleFilm />
        
        <div className='flex gap-1 mt-6 justify-center'>
          <img className='h-[360px] max-w-full object-contain' src={film.image} alt={film.title} />
          <ReactPlayer
            url={film.trailer} 
            controls={true} 
            width="100%" 
            height="360px"
            className="max-w-full"
          />
        </div>

        <DetailsSingleFilms />
      </div>
    </div>
  );
};

export default SingleFilm;
