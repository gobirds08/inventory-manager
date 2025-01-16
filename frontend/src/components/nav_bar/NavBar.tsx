import placeholder from "../../assets/placeholder-icon.jpg"
import profile_default from "../../assets/profile-default.png"

function NavBar(){
    return (
    <div className="nav">
        <img src={placeholder} alt="Logo" className="logo"/>
        <h1>Inventory Manager</h1>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#help">Help</a></li>
        </ul>
        <img src={profile_default} alt="Login" className="Login" />
    </div>)
}

export default NavBar;