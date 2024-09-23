const CardTestimonial = ({ testimonialFilms }) => {
  return (
      <div className="w-full h-80 bg-gray-900 flex justify-center items-center overflow-hidden">
          <img className="max-w-full h-80 object-cover " src={testimonialFilms.image} alt="Testimonial" />
      </div>
  );
};

export default CardTestimonial;