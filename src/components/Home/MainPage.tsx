import { paginations } from "../../api/paginations";
import BodyPage from "./BodyPage";
import HeaderTestimonial from "./testimonial/HeaderTestimonial";

const MainPage = () => {
    return (
       <div className="bg-gray-900  overflow-hidden max-w-full w-full px-6">
            <HeaderTestimonial />
            <BodyPage />
            <button className="bg-cyan-400" onClick={() => paginations()}>PAGINATION</button>
       </div>
    );
};

export default MainPage;
