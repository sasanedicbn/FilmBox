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
        <div className="w-[100%] bg-red-400 flex max-w-6xl mx-auto">
            {films.map((film) => (
                <CardTestimonial key={film.id} testimonialFilms={film} /> 
            ))}
        </div>
    );
};

export default Films;
