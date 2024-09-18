import { fetchData } from "../api/fetchData";
import { data } from "../utils/data";

const Home = () => {
    return(
        <div>
         <button onClick={() => fetchData(data)}>Add data</button>    
        </div>
    )
}

export default Home;