import { Film } from "../../../types/types";
import HoverComponent from "../../UI/HoverComponent";

const CardTestimonial = ({ testimonialFilms }:{testimonialFilms:Film}) => {
  
  return (
      <div className="w-full h-80  bg-gray-900 flex justify-center items-center overflow-hidden relative rounded-lg"> {/* rounded-lg da doda zaobljene ivice */}
          <img className="h-80 object-cover" src={testimonialFilms.image} alt="Testimonial"  />
          <HoverComponent films={testimonialFilms}/>
      </div>
  );
};

export default CardTestimonial;
