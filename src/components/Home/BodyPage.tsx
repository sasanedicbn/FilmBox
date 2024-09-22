import Input from "../UI/Input";
import Icon from "../UI/Icon";

const BodyPage = () => {
    return(
    <div className=" bg-cyan-200 mt-32 flex  w-[600px] h-[200px] px-10">
        <Input type="text" name="searchFilms" onChange={() => {console.log('onchange')}} />
        {/* <select>
            <options>SASAS</options>
        </select> */}
        <Icon name={'marked'}/>
        <Icon name={'home'}/>
    </div>
    )
}

export default BodyPage;