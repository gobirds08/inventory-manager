import { SupplierOrder } from "../../models/SupplierOrderDetails";
import { Product } from "../../models/Product";
import { useEffect, useState } from "react";
import { SupplierOrderDetail } from "../../models/SupplierOrderDetails";
import ProductView from "../product_view/ProductView";

interface PopUpCardBarProps {
	supplier_orders: SupplierOrderDetail[];
}

function PopUpCardBar({ supplier_orders }: PopUpCardBarProps) {
	const [products, setProducts] = useState<Product[]>([]);
	const [firstProductIndex, setFirstProductIndex] = useState<number>(0);
	const numProductsToShow = 5;

	function handleArrowClick(left: boolean) {
		if (left) {
			if (firstProductIndex === 0) {
				return;
			}
			setFirstProductIndex(firstProductIndex + 1);
		} else {
			if (firstProductIndex === products.length - 1) {
				return;
			}
			setFirstProductIndex(firstProductIndex - 1);
		}
	}

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
			<button className="arrow-left" onClick={() => handleArrowClick(true)}>
				&#8592; Left
			</button>
			{products
				.slice(firstProductIndex, firstProductIndex + numProductsToShow)
				.map((product) => (
					<ProductView key={product.product_id} product={product} />
				))}
			<button className="arrow-right" onClick={() => handleArrowClick(false)}>
				Right &#8594;
			</button>
		</div>
	);
}

export default PopUpCardBar;
