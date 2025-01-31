import { SupplierOrder } from "../../models/SupplierOrderDetails";
import { Product } from "../../models/Product";
import { useEffect, useState } from "react";
import { SupplierOrderDetail } from "../../models/SupplierOrderDetails";

interface PopUpCardBarProps {
	supplier_orders: SupplierOrderDetail[];
}

function PopUpCardBar({ supplier_orders }: PopUpCardBarProps) {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		let temp_products: Product[] = [];
		const fetchProducts = async (product_id: number) => {
			const response = await fetch(
				`http://localhost:3001/product/${product_id}`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			const data = await response.json();
			temp_products.push(data);
		};
		for (let i = 0; i < supplier_orders.length; i++) {
			fetchProducts(supplier_orders[i].product_id);
		}
		setProducts(temp_products);
	}, []);

	return (
		<div className="container">
			<button className="arrow-left">&#8592; Left</button>
			<></>
			<button className="arrow-right">Right &#8594;</button>
		</div>
	);
}

export default PopUpCardBar;
