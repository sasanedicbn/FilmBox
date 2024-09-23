import Icon from "./Icon";

const HoverComponent = () => {
    return(
        <div>
           <span> <Icon name="marked" size={30} color="grey" /></span>
           <p>See more <span><Icon name="search" size={30} color="grey" /></span></p>
        </div>
    )
}
export default HoverComponent;