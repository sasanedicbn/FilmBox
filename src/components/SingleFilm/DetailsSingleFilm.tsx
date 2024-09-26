const DetailsSingleFilms = () => {
    return(
        <div>
         <h1>{film.title}</h1>
         <p>{film.description}</p>
         <p>Director: {film.director.join(", ")}</p>
         <p>Year: {film.year}</p>
         <p>Rating: {film.rating}</p>
      </div>
    )
}
export default DetailsSingleFilms;