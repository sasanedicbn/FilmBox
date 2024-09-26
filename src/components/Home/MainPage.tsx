import BodyPage from "./BodyPage";
import HeaderTestimonial from "./testimonial/HeaderTestimonial";

const MainPage = () => {
    return (
       <div className="bg-gray-900 overflow-hidden max-w-full w-full px-6">
            <HeaderTestimonial />
            <BodyPage />
       </div>
    );
};

export default MainPage;
