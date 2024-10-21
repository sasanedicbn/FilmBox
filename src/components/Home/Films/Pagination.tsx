import { useEffect, useState } from "react";
import { fetchTotalFilmsCount } from "../../../api/fetchTotalFIlmsCount";
import LengthPagination from "../../UI/LengthPagination";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Button from "../../UI/Button";
import PaginationWrapper from "../../UI/PaginationWrapper";
import { paginationProps } from "../../../types/types";

const Pagination = ({ fetchNextPage, fetchPreviousPage, fetchPage }:paginationProps) => {
    const [numPagination, setNumPagination] = useState(0);
    const [activePage, setActivePage] = useState(1);
    
    const lengthPagination =  Math.ceil(numPagination / 12)

    useEffect(() => {
        const totalFilms = async () => {
            const filmsCount = await fetchTotalFilmsCount();
            console.log('filmsCount', filmsCount)
            setNumPagination(filmsCount);
        };
        totalFilms();
    }, []);

    const handlePageChange = (index:number) => {
        setActivePage(index);
        fetchPage(index); 
    };

    const handleNext = () => {
        if (activePage < lengthPagination ) {
            const nextPage = activePage + 1;
            setActivePage(nextPage);
             fetchNextPage()
            
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
        <PaginationWrapper type="bigNumberPagination">
            <Button onClick={handlePrevious} disabled={activePage === 0} type="pagination" >
               <AiOutlineLeft />
            </Button>
             <LengthPagination lengthPagination={lengthPagination} activePage={activePage} handlePageChange={handlePageChange}/>
            <Button onClick={handleNext} disabled={activePage === lengthPagination} type="pagination" >
              <AiOutlineRight />
            </Button>
        </PaginationWrapper>
    );
};

export default Pagination;
