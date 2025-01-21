import { Product } from "../../models/Product";
import Button from "../button/Button";
import PopUp from "../pop-up/PopUp";
import { useState } from "react";

interface ProductProps {
	product: Product;
}

function ProductView({ product }: ProductProps) {
	const [popUpOpen, setPopUpOpen] = useState<boolean>(false);

	const price_parts: string[] = product.price_per_unit.toString().split(".");
	return (
		<>
			<Button classes="card" action={() => setPopUpOpen(true)}>
				<img
					src={product.image_url}
					alt="Product Image"
					className="product-photo"
				/>
				<h3>{product.product_name}</h3>
				<div className="product-info">
					<span className="quantity">
						Quantity: {product.quantity_in_stock}
					</span>
					<div className="price">
						<span className="price-int">${price_parts[0]}</span>
						<span className="price-dec">
							.{price_parts.length == 1 ? "00" : price_parts[1]}
						</span>
					</div>
				</div>
			</Button>
			<PopUp show={popUpOpen} onClose={() => setPopUpOpen(false)}>
				<div>
					<h1>Test</h1>
				</div>
			</PopUp>
		</>
	);
}

export default ProductView;
