import { useSelector } from 'react-redux';

const SingleFilm = () => {
  const film = useSelector((state) => state.films?.currentFilm); 
  console.log('single Film', film)

  if (!film) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{film.title}</h1>
      <p>{film.description}</p>
      <img src={film.image} alt={film.title} />
      <p>Director: {film.director.join(", ")}</p>
      <p>Year: {film.year}</p>
      <p>Rating: {film.rating}</p>
    </div>
  );
};

export default SingleFilm;
