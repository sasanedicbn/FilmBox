import { FaCheckCircle, FaHome } from "react-icons/fa";
import Input from "../UI/Input";

const BodyPage = () => {
    return(
    <div className=" bg-cyan-200 mt-32 flex  w-96 ">
        <Input type="text" name="searchFilms" onChange={() => {console.log('onchange')}} />
        <p>SAAAAAAAAAAAAAAASASASAS</p>
        {/* <option>
            <select>Sort BY</select>
        </option> */}
        <FaCheckCircle/>
        <FaHome/>
    </div>
    )
}

export default BodyPage;