import { sendData } from "../../api/sendData";
import { sendTestimonialFilms } from "../../api/sendTestimonialFilms";
import { data } from "../../utils/data";
import { testimonialData } from "../../utils/testimonialData";
import MainPage from "./MainPage";
import NavMenuSection from "./NavMenuSection";

const Home = () => {
    return(
        <div>
          <NavMenuSection/>
          <MainPage/>
         {/* <button onClick={() => sendData(data)}>Add data</button>    
         <button onClick={() => sendTestimonialFilms(testimonialData)}>add testimonial</button> */}
        </div>
    )
}

export default Home;