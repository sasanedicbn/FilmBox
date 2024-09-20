import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonialFilms } from "../../../store/slices/filmsSlice";
import CardTestimonial from "./CardTestimonial";
import { useEffect, useState } from "react";

const HeaderTestimonial = () => {
    // const dispatch = useDispatch();
    const [films, setFilms] = useState([])
    
    // Use an empty array as fallback if the state is not initialized
    // const films = useSelector((state) => state.films?.testimonialFilms || []);

    const getTestimonials = async () => {
        const testimonialCollection = collection(db, 'testimonialFilms'); 
        const testimonialSnapshot = await getDocs(testimonialCollection);
        const testimonialList = testimonialSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // dispatch(getTestimonialFilms(testimonialList));
        setFilms(testimonialList)
    };

    useEffect(() => {
        getTestimonials(); // Fetch testimonials on component mount
    }, []);

    // console.log('returned films', films)
    return (
        <div className="w-full">
            {films.length > 0 ? (
                films.map((film) => (
                    <CardTestimonial key={film.id} testimonialFilms={film} /> // Ensure unique key
                ))
            ) : (
                <p>No testimonials available</p> // Handle case when there are no films
            )}
            <button onClick={getTestimonials}>Add Testimonials</button>
        </div>
    );
}

export default HeaderTestimonial;
