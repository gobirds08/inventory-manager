import placeholder from "../../assets/placeholder-icon.jpg";
import profile_default from "../../assets/profile-default.png";
import { Link } from "react-router-dom";

function NavBar() {
	return (
		<div className="nav">
			<img src={placeholder} alt="Logo" className="logo" />
			<h1>Inventory Manager</h1>
			<ul>
				<li>
					<Link to="/products">Products</Link>
				</li>
				<li>
					<Link to="/supplier_orders">Supply Orders</Link>
				</li>
			</ul>
			<img src={profile_default} alt="Login" className="Login" />
		</div>
	);
}

export default NavBar;
