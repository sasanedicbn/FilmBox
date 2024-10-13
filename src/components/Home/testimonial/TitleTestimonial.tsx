import { Film } from "../../../types/types";

const TitleTestimonial = ({ currentIndex, currentFilms, films }:{currentIndex:number, currentFilms:number, films:Film[]}) => {
    const testimonialFilms = films ? films.length : 0;
    const totalIndicators = testimonialFilms / currentFilms 
    const current = currentIndex / currentFilms;

    return (
        <div className="flex md:justify-between flex-col mb-4 mx-auto ">
            <p className="text-xl text-center md:text-left font-medium text-white">Currently trending</p>
            <div className="flex justify-end gap-1 p-3 ">
                {Array.from({ length: totalIndicators }).map((_, index) => (
                    <div
                        key={index}
                        className={`pt-1 px-2  cursor-pointer ${
                            current === index ? 'bg-emerald-400' : 'bg-emerald-100'
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default TitleTestimonial;
