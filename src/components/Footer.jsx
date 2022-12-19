export default function Footer(){
    let year = new Date().getFullYear();

    return(
        <footer>
            <p>© {year} Graham Van Pelt</p>
        </footer>
        
    )
}