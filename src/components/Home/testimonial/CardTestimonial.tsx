const CardTestimonial = ({testimonialFilms}) => {
    console.log('testimonialFilms iz dijeteta', testimonialFilms)
    return(
      <div className="w-96 h-80 bg-slate-400 flex justify-center ">
         <img className="w-80" src={testimonialFilms.image} />
      </div>
    )
}

export default CardTestimonial;