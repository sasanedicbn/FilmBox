const TitleTestimonial = ({ currentIndex, currentFilms, films }) => {
    // console.log(films, 'films')
    const testimonialFilms = films ? films.length : 0;
    const totalIndicators = testimonialFilms / currentFilms 
    const current = currentIndex / currentFilms;
    console.log('currentIndex', currentIndex, 'currentFilms', currentFilms)

    return (
        <div className="flex justify-between mb-4 mx-6">
            <p className="text-xl font-medium text-white">Currently trending</p>
            <div className="flex justify-end gap-1 p-3">
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
