import { Product } from "../../models/Product";
import styles from "./ProductPopUp.module.css";

interface ProductPopUpProps {
	product: Product;
}

export default function ProductPopUp({ product }: ProductPopUpProps) {
	return (
		<div className={`container ${styles.outerBox}`}>
			<div className={styles.content}>Hello</div>
			<div className={styles.content}>
				<img src={product.image_url} alt="Product Image" />
			</div>
		</div>
	);
}
