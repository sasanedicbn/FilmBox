const TitleTestimonial = ({ currentIndex }) => {
    const totalIndicators = 5;
    const current = currentIndex / 4;

    return (
        <div className="flex justify-between mb-2">
            <p className="text-lg font-medium text-white">Currently trending</p>
            <div className="flex justify-end gap-1 p-2">
                {Array.from({ length: totalIndicators }).map((_, index) => (
                    <div
                        key={index}
                        className={`pt-1 px-3 cursor-pointer ${
                            current === index ? 'bg-cyan-400' : 'bg-cyan-200'
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default TitleTestimonial;
