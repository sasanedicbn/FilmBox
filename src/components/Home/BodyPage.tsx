import Input from "../UI/Input";
import Icon from "../UI/Icon";
import GenreSelect from "../UI/GenreSelect";

const BodyPage = () => {
    return (
        <div className="bg-cyan-200 flex items-center justify-center w-[600px] h-[200px] px-10">
            <div className="flex items-center gap-4">
                <Icon name="marked" size={30} color="green" />
                <Icon name="home" size={30} color="blue" />
            </div>
            <div className="flex-grow">
                <Input
                    type="text"
                    name="searchFilms"
                    placeholder="Search films..."
                    onChange={() => { console.log('onchange') }}
                />
            </div>
            <div className="ml-4">
                <GenreSelect />
            </div>
        </div>
    );
};

export default BodyPage;
