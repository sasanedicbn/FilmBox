import { fetchData } from "../../api/fetchData";
import { data } from "../../utils/data";
import MainPage from "./MainPage";
import NavMenuSection from "./NavMenuSection";

const Home = () => {
    return(
        <div>
          <NavMenuSection/>
          <MainPage/>
         <button onClick={() => fetchData(data)}>Add data</button>    
        </div>
    )
}

export default Home;