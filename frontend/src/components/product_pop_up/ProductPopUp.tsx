import { Product } from "../../models/Product";
import Button from "../button/Button";
import styles from "./ProductPopUp.module.css";

interface ProductPopUpProps {
	product: Product;
}

export default function ProductPopUp({ product }: ProductPopUpProps) {
	const price_parts: string[] = product.price_per_unit.toString().split(".");

	return (
		<div className={`container ${styles.outerBox}`}>
			<div className={styles.content}>
				<div className={styles.separate}>
					<h1>{product.product_name}</h1>
					<span>Product ID: {product.product_id}</span>
				</div>
				<div>
					<span className="price-int">${price_parts[0]}</span>
					<span className="price-dec">
						.{price_parts.length == 1 ? "00" : price_parts[1]}
					</span>
				</div>
				<div className={`container ${styles.stockButton}`}>
					<h4>Stock: {product.quantity_in_stock}</h4>
					{/* action for button below will be to take to order page with product_id */}
					<Button>Order More</Button>
				</div>
				<div className={styles.close}>
					<h4>Product Description</h4>
					<p>{product.description}</p>
				</div>
			</div>
			<div className={styles.content}>
				<img src={product.image_url} alt="Product Image" />
			</div>
		</div>
	);
}
