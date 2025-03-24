// import Button from "./components/button/Button"
import NavBar from "./components/nav_bar/NavBar";
import Products from "./pages/Products";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SupplierOrders from "./pages/SupplierOrders";
import Login from "./components/login/login";

function App() {
	return (
		<>
			<BrowserRouter>
				<NavBar />
				<div className="content">
					{/* <Routes>
						<Route path="/products" element={<Products />} />
						<Route path="/supplier_orders" element={<SupplierOrders />} />
						<Route path="/" element={<Navigate to="/products" />} />
						<Route path="*" element={<h1>404 - Page Not Found</h1>} />
					</Routes> */}
					<Login />
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
