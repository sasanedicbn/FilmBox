import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import HeaderSingleFilm from './HeaderSingleFilm';
import DetailsSingleFilms from './DetailsSingleFilm';
import ComponentWrapper from '../UI/ComponentWrapper';

const SingleFilm = () => {
  const film = useSelector((state) => state.films?.currentFilm); 
  console.log('single Film', film);

  if (!film) {
    return <div>Loading...</div>;
  }

  return (
      <ComponentWrapper>
        <HeaderSingleFilm/>
        <img src={film.image} alt={film.title} />
        <ReactPlayer
          url={film.trailer} 
          controls={true} 
          width="640px" 
          height="360px"
        />
        <DetailsSingleFilms/>
      </ComponentWrapper>
    
  );
};

export default SingleFilm;
