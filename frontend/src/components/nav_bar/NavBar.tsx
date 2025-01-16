import placeholder from "../../assets/placeholder-icon.jpg"

function NavBar(){
    return (
    <div className="nav">
        <img src={placeholder} alt="Logo" className="logo"/>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </div>)
}

export default NavBar;