import { useState, useEffect } from "react";
import CardTestimonial from "../testimonial/CardTestimonial";
import { paginations } from "../../../api/paginations";

const Films = () => {
    const [films, setFilms] = useState([]); 

    useEffect(() => {
        const fetchFilms = async () => {
            const filmsData = await paginations();
            setFilms(filmsData); 
        };

        fetchFilms();
    }, []); 

    return (
        <div className="flex mx-auto overflow-hidden mt-14 max-w-6xl px-6">
            {films.map((film) => (
                <CardTestimonial key={film.id} testimonialFilms={film} /> 
            ))}
        </div>
    );
};

export default Films;
