import { PaginationWrapperProps } from "../../types/types";

const PaginationWrapper = ({ children, type }: PaginationWrapperProps) => {
    const base = 'flex justify-between my-8 mx-auto';
    const styles = {
        smallNumberPagination: `${base} w-full sm:w-1/2 md:w-1/3 lg:w-1/4`, 
        bigNumberPagination: `${base} w-full sm:w-3/4 md:w-2/3 lg:w-1/2`,
    };
    return (
      <div className={styles[type]}>
        {children}
      </div>
    );
};

export default PaginationWrapper;
