import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useEffect, useState } from "react";
import CardTestimonial from "./CardTestimonial";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TitleTestimonial from "./TitleTestimonial";

const HeaderTestimonial = () => {
    const [films, setFilms] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); 
    let currentFilms = 4


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
        getTestimonials(); 
    }, []);


    useEffect(() => {
        const test = window.matchMedia('screen and (max-width:600px)')
    test.addListener(() => console.log('change'))
     console.log('TEST', test)
    }, [])

   
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? films.length - currentFilms : prevIndex - currentFilms
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + currentFilms >= films.length ? 0 : prevIndex + currentFilms
        );
    };

    return (
        <div className="mx-56 overflow-hidden mt-14">
            <TitleTestimonial currentIndex={currentIndex} currentFilms={currentFilms} />
            <div
                className="flex transition-transform duration-500"
                style={{
                    transform: `translateX(-${currentIndex * 100 / currentFilms}%)`, 
                }}
            >
                {films.length > 0 ? (
                    films.map((film) => (
                        <div className="w-1/4 flex-shrink-0" key={film.id}>
                            <CardTestimonial testimonialFilms={film} />
                        </div>
                    ))
                ) : (
                    <p>No testimonials available</p>
                )}
            </div>
            <button 
                onClick={handlePrev} 
                className="absolute top-1/2 left-[9.5rem] transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
                <FaArrowLeft />
            </button>
            <button 
                onClick={handleNext} 
                className="absolute top-1/2  right-[9.5rem] transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
                <FaArrowRight />
            </button>
        </div>
    );
};

export default HeaderTestimonial;