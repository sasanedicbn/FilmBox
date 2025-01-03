import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useEffect, useState } from "react";
import CardTestimonial from "./CardTestimonial";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TitleTestimonial from "./TitleTestimonial";
import { Film } from "../../../types/types";
import Spinner from "../../UI/Spinner";

const HeaderTestimonial = () => {
    const [films, setFilms] = useState<Film[]>([]); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentFilms, setCurrentFilms] = useState(4);
    const [loading, setLoading] = useState(true); 

    const getTestimonials = async () => {
        setLoading(true); 
        const testimonialCollection = collection(db, "testimonialFilms");
        const testimonialSnapshot = await getDocs(testimonialCollection);
        const testimonialList = testimonialSnapshot.docs.map((doc) => ({
            id2: doc.id,
            ...doc.data(),
        })) as Film[];
        setFilms(testimonialList);
        setLoading(false); 
    };

    useEffect(() => {
        getTestimonials();
    }, []);

    useEffect(() => {
        const updateCurrentFilms = () => {
            if (window.matchMedia("(max-width: 720px)").matches) {
                setCurrentFilms(1);
            } else if (window.matchMedia("(max-width: 1000px)").matches) {
                setCurrentFilms(2);
            } else {
                setCurrentFilms(4);
            }
        };

        updateCurrentFilms();
        window.addEventListener("resize", updateCurrentFilms);

        return () => {
            window.removeEventListener("resize", updateCurrentFilms);
        };
    }, []);

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
        <div className="relative mx-auto overflow-hidden mt-14 max-w-[70rem]">
            <TitleTestimonial currentIndex={currentIndex} currentFilms={currentFilms} films={films} />
            {loading ? ( 
                <Spinner/>
            ) : (
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${(currentIndex * 100) / currentFilms}%)`,
                    }}
                >
                    {films.length > 0 ? (
                        films.map((film: Film) => (
                            <div
                                className="flex-shrink-0"
                                style={{ flex: `0 0 ${100 / currentFilms}%` }}
                                key={film.id2}
                            >
                                <CardTestimonial testimonialFilms={film} />
                            </div>
                        ))
                    ) : (
                        <p>No testimonials available</p>
                    )}
                </div>
            )}
            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
                <FaArrowLeft />
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
                <FaArrowRight />
            </button>
        </div>
    );
};

export default HeaderTestimonial;
