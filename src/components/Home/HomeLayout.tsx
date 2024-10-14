import { Outlet } from "react-router-dom";
import NavMenuSection from "./NavMenuSection";
import Spinner from "../UI/Spinner";

function HomeLayout() {
    return (
      <>
        <NavMenuSection/>  
        <Outlet />  
      </>
    );
  }

  export default HomeLayout;