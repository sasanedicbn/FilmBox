const CardTestimonial = ({ testimonialFilms }) => {
  return (
      <div className="w-full h-80 bg-slate-400 flex justify-center items-center">
          <img className="max-w-full max-h-full object-cover m-2" src={testimonialFilms.image} alt="Testimonial" />
      </div>
  );
};

export default CardTestimonial;