const PaginationWrapper = ({children, type}) => {
    const base = 'flex justify-between my-8 mx-auto'
    const styles = {
        smallNumberPagination: `${base} w-1/4`,
        bigNumberPagination: `${base} w-1/2`,
      };
    return(
      <div className={styles[type]}>
        {children}
      </div>
    )
}

export default PaginationWrapper;