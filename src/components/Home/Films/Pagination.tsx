import { useState } from "react";

const Pagination = ({ fetchFilms, }) => {
    const [activePage, setActivePage] = useState(1); 
    let lengthPagination = 10;

    const handleNext = () => {
        if (activePage < lengthPagination - 1) {
            const nextPage = activePage + 1;
            setActivePage(nextPage);
        }
    };

    const handlePrevious = () => {
        if (activePage > 0) {
            const prevPage = activePage - 1;
            setActivePage(prevPage);
        }
    };

    return (
        <div className="flex justify-center mt-6 space-x-2">
            <button 
                className="bg-slate-100" 
                onClick={handlePrevious}
                disabled={activePage === 0} 
            >
                Previous
            </button>
            {Array.from({ length: lengthPagination }).map((_, index) => (
                <div
                    key={index}
                    className={`w-8 h-8 flex justify-center items-center rounded-full cursor-pointer font-bold transition-all duration-300 
                    ${activePage === index ? 'bg-cyan-600 text-white' : 'bg-cyan-200 text-black hover:bg-cyan-400'}`}
                    onClick={() => {
                        setActivePage(index);
                        fetchFilms(index);  
                    }}
                >
                    {index + 1}
                </div>
            ))}
            <button 
                className="bg-slate-100" 
                onClick={handleNext}
                disabled={activePage === lengthPagination - 1}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
