import { useSelector } from "react-redux";

const DetailsSingleFilms = () => {
    const film = useSelector((state) => state.films?.currentFilm)
    return(
        <div>
          {film.genre?.map((filmGenre) => {
            <p>{filmGenre}</p>
          })}
         <p>{film.description}</p>
         <p>Director</p>
         <p>{film.director[0]}</p>
         <p>Writers</p>
         <p>{film.writers[0]}</p>
        </div>
    )
}
export default DetailsSingleFilms;