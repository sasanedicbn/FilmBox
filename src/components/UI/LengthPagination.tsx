const LengthPagination = ({ lengthPagination, activePage, handlePageChange }) => {
    return (
        <>
            {Array.from({ length: lengthPagination }).map((_, index) => (
                <div
                    key={index}
                    className={`w-8 h-8 flex justify-center items-center rounded-full cursor-pointer font-bold transition-all duration-300 
                    ${activePage === index + 1 ? 'bg-cyan-600 text-white' : 'bg-cyan-200 text-black hover:bg-cyan-400'}`}
                    onClick={() => handlePageChange(index + 1)} 
                >
                    {index + 1}
                </div>
            ))}
        </>
    );
}

export default LengthPagination;
