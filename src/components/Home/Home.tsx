import { fetchData } from "../../api/fetchData";
import { data } from "../../utils/data";
import NavMenuSection from "./NavMenuSection";

const Home = () => {
    return(
        <div>
          <NavMenuSection/>
         <button onClick={() => fetchData(data)}>Add data</button>    
        </div>
    )
}

export default Home;