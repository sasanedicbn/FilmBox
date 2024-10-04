import { useState } from "react";
import { paginations } from "../../api/paginations";
import BodyPage from "./BodyPage";
import BookMarked from "./BookMarked/BookMarked";
import Films from "./Films/Films";
import HeaderTestimonial from "./testimonial/HeaderTestimonial";

const MainPage = () => {
  const [openFilms, setOpenFilms] = useState(true);

  const openItem = () => {
    setOpenFilms((films) => !films);
  };

  return (
    <div className="bg-gray-900 overflow-hidden max-w-full w-full px-6">
      <HeaderTestimonial />
      <BodyPage openClickedFilms={openItem} openFilms={openFilms} />
      {open
      </button>
    </div>
  );
};

export default MainPage;
