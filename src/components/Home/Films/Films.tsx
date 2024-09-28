import { useState } from "react";
import CardTestimonial from "../testimonial/CardTestimonial";
import { paginations } from "../../../api/paginations";
import Pagination from "./Pagination";

const Films = () => {
    const [films, setFilms] = useState([]); 
    const [currentPage, setCurrentPage] = useState(0);

    const fetchFilms = async (page) => {
        const filmsData = await paginations(page);  // Pretpostavljam da paginations funkcija prima broj stranice
        setFilms(filmsData);
        setCurrentPage(page); // Ažurira trenutnu stranicu
    };

    return (
        <div>
            <div className="flex mx-auto overflow-hidden mt-14 max-w-6xl px-6">
                {films.map((film) => (
                    <CardTestimonial key={film.id2} testimonialFilms={film} /> 
                ))}
            </div>
            <Pagination fetchFilms={fetchFilms} currentPage={currentPage} /> 
            {/* Prosledili smo fetchFilms funkciju kao prop u Pagination */}
        </div>
    );
};

export default Films;
