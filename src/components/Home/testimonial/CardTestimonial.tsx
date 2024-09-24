import HoverComponent from "../../UI/HoverComponent";

const CardTestimonial = ({ testimonialFilms }) => {
  
  return (
      <div className="w-full h-80 bg-gray-900 flex justify-center items-center overflow-hidden relative">
          <img className="max-w-full h-80 object-cover " src={testimonialFilms.image} alt="Testimonial"  />
          <HoverComponent films={testimonialFilms}/>
      </div>
  );
};

export default CardTestimonial;