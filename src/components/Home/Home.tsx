import { sendData } from "../../api/sendData";
import { data } from "../../utils/data";
import MainPage from "./MainPage";
import NavMenuSection from "./NavMenuSection";

const Home = () => {
    return(
        <div>
          <NavMenuSection/>
          <MainPage/>
         <button onClick={() => sendData(data)}>Add data</button>    
        </div>
    )
}

export default Home;