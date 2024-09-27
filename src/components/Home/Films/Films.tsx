import { useState, useEffect } from "react";
import CardTestimonial from "../testimonial/CardTestimonial";
import { paginations } from "../../../api/paginations";
import Pagination from "./Pagination";

const Films = () => {
    const [films, setFilms] = useState([]); 

    // useEffect(() => {
        const fetchFilms = async () => {
            const filmsData = await paginations();
            setFilms(filmsData); 
        };

    // }, []); 

    return (
        <div>
        <div className="flex  mx-auto overflow-hidden mt-14 max-w-6xl px-6">
            {films.map((film) => (
                <CardTestimonial key={film.id2} testimonialFilms={film} /> 
            ))}
        </div>
                <Pagination  /> 
                <button onClick={fetchFilms}>Next</button>
        </div>
    );
};

export default Films;
