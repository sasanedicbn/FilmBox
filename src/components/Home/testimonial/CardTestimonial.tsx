const CardTestimonial = ({ testimonialFilms }) => {
  return (
      <div className="w-full h-80 bg-gray-900 flex justify-center items-center ">
          <img className="max-w-full h-80 object-cover m-2" src={testimonialFilms.image} alt="Testimonial" />
      </div>
  );
};

export default CardTestimonial;