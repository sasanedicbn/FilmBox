import { Outlet } from "react-router-dom";
import NavMenuSection from "./NavMenuSection";

function HomeLayout() {
    return (
      <>
        <NavMenuSection/>  
        <Outlet />  
      </>
    );
  }

  export default HomeLayout;