import { useSelector } from "react-redux";

const HeaderSingleFilm = () => {
    const film = useSelector((state) => state.films?.currentFilm); 

    return(
      <div>
        <div>
          <p>{film.title}</p>
          <p>{film.year}</p>
        </div>
        <div>
          <p>Imdb rating <span>{film.rating}/10</span></p>
          <p>Rank <span>{film.rank}/100</span></p>
        </div>
      </div>
    )
}

export default HeaderSingleFilm;