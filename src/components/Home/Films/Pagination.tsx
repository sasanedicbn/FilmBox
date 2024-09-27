const Pagination = () => {
    let lengthPagination = 10;
    
    return (
        <div className="pagination-container"> 
            {Array.from({ length: lengthPagination }).map((_, index) => (
                <div
                    key={index}
                    className="w-4 h-4 m-2 bg-cyan-200"
                >
                    {index}
                </div>
            ))}
        </div>
    );
};

export default Pagination;
