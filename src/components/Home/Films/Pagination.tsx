import { useEffect, useState, useMemo } from "react";
import { fetchTotalFilmsCount } from "../../../api/fetchTotalFIlmsCount";
import { useSelector } from "react-redux";
import LengthPagination from "../../UI/LengthPagination";

const Pagination = ({ fetchNextPage, fetchPreviousPage, fetchPage }) => {
    const [numPagination, setNumPagination] = useState(0);
    const [activePage, setActivePage] = useState(0);
    const numMarkedFilms = useSelector((state) => state.films.bookedFilm)
    
    // const lengthPagination = useMemo(() => Math.ceil(numPagination / 12), [numPagination]);
    const lengthPagination =  Math.ceil(numPagination / 12)
    // const fetchBookedFilms = () => {
    //     setNumPagination(12)
    //     const bookedFilms = useSelector(state => state.films.bookedFilm)
    //     if(bookedFilms > numPagination){
    //       setNumPagination(lengthPagination)
    //     }
    // }
    useEffect(() => {
        const totalFilms = async () => {
            const filmsCount = await fetchTotalFilmsCount();
            console.log('filmsCount', filmsCount)
            setNumPagination(filmsCount);
        };
        totalFilms();
    }, []);

    const handlePageChange = (index) => {
        setActivePage(index);
        fetchPage(index); 
    };

    const handleNext = () => {
        if (activePage < lengthPagination - 1) {
            const nextPage = activePage + 1;
            setActivePage(nextPage);
            fetchNextPage();
        }
    };

    const handlePrevious = () => {
        if (activePage > 0) {
            const prevPage = activePage - 1;
            setActivePage(prevPage);
            fetchPreviousPage(); 
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
             <LengthPagination lengthPagination={lengthPagination} activePage={activePage} handlePageChange={handlePageChange}/>
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
