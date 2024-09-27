import { useState } from "react";

const Pagination = () => {
    const [activePage, setActivePage] = useState(0);
    let lengthPagination = 10;
 

    return (
        <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: lengthPagination }).map((_, index) => (
                <div
                    key={index}
                    className={`w-8 h-8 flex justify-center items-center rounded-full cursor-pointer font-bold transition-all duration-300 
                    ${activePage === index ? 'bg-cyan-600 text-white' : 'bg-cyan-200 text-black hover:bg-cyan-400'}`}
                    onClick={() => setActivePage(index)}
                >
                    {index + 1}
                </div>
            ))}
        </div>
    );
};

export default Pagination;
