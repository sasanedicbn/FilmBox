import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useEffect, useState } from "react";
import CardTestimonial from "./CardTestimonial";

const HeaderTestimonial = () => {
    const [films, setFilms] = useState([]);

    const getTestimonials = async () => {
        const testimonialCollection = collection(db, 'testimonialFilms'); 
        const testimonialSnapshot = await getDocs(testimonialCollection);
        const testimonialList = testimonialSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setFilms(testimonialList);
    };

    useEffect(() => {
        getTestimonials(); // Fetch testimonials on component mount
    }, []);

    return (
        <div className=" w-1/2 overflow-hidden w-[925px]">
            <div className="flex transition-transform duration-500 ">
                {films.length > 0 ? (
                    films.map((film) => (
                        <div className="w-96px flex-shrink-0" key={film.id}>
                            <CardTestimonial testimonialFilms={film} />
                        </div>
                    ))
                ) : (
                    <p>No testimonials available</p>
                )}
            </div>
            <button  className="absolute top-72 left-32 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">Prev</button>
            <button className="absolute right-32 top-72 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">Next</button>
        </div>
    );
}

export default HeaderTestimonial;
