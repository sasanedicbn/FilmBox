import Input from "../UI/Input";
import Icon from "../UI/Icon";
import Select from "../UI/Select";
import Option from "../UI/Option";

const BodyPage = () => {
    return (
        <div className="bg-gray-800 mx-auto flex items-center justify-between w-[75%]  mt-24 p-4  rounded-lg">
            <Input
                type="text"
                name="searchFilms"
                placeholder="Search films..."
                onChange={() => { console.log('onchange') }}
                styleType='searchFilms'
                value=""
            />

            <div className="flex items-center gap-4">
                <Select name="genreSelect" onChange={(e) => console.log(e.target.value)}>
                    <Option value="all">All</Option>
                    <Option value="action">Action</Option>
                    <Option value="drama">Drama</Option>
                    <Option value="comedy">Comedy</Option>
                    <Option value="horror">Horror</Option>
                </Select>
                <Icon name="marked" size={30} color="grey" />
                <Icon name="home" size={30} color="grey" />
            </div>
        </div>
    );
};

export default BodyPage;
