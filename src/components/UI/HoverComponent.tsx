import Icon from "./Icon";

const HoverComponent = () => {
    return (
      <div className="absolute  inset-0 bg-slate-400 mx-7 pointer bg-opacity-80 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 p-2">
        <div className="text-center ">
          <span className="absolute top-2 right-2"><Icon name="marked" size={30} color="white" /></span>
          <p className="mt-4 text-gray flex gap-2 items-center justify-center bg-gray-300 bg-opacity-80 p-2">See more <span><Icon name="search" size={15} color="black" /></span></p>
        </div>
      </div>
    );
  };
  
  export default HoverComponent;