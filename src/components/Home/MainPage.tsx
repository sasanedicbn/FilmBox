import BodyPage from "./BodyPage";
import HeaderTestimonial from "./testimonial/HeaderTestimonial";

const MainPage = () => {
    return (
        <div className="bg-gray-900   flex flex-col items-center justify-center">
            <HeaderTestimonial />
            <BodyPage />
        </div>
    );
};

export default MainPage;
