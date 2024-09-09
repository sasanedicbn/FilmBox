const Button = ({type,children,onClick}) => {
    const base = 'border-none py-2.5 px-5 text-center no-underline cursor-pointer rounded'

    const styles = {
      LoginBtn: `${base} + 'border-red-500'`
    }
    return(
        <button className={styles[type]} onClick={onClick}>{children}</button>
    )
}

export default Button