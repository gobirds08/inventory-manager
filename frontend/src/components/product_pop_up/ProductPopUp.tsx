import { useNavigate } from "react-router-dom";
import { Product } from "../../models/Product";
import Button from "../button/Button";
import styles from "./ProductPopUp.module.css";
import { SupplierOrder } from "../../models/SupplierOrders";
import {
	addProductToSupplierOrder,
	createSupplierOrder,
	getSupplierOrdersFromSupplierIDAndNotOrdered,
} from "../../utilities/FetchData";

interface ProductPopUpProps {
	product: Product;
}

export default function ProductPopUp({ product }: ProductPopUpProps) {
	const price_parts: string[] = product.price_per_unit.toString().split(".");
	const navigate = useNavigate();

	const handleOrderPerProduct = async () => {
		try {
			let finalOrder: SupplierOrder;
			const order: SupplierOrder[] =
				await getSupplierOrdersFromSupplierIDAndNotOrdered(product.supplier_id);
			if (order.length === 0) {
				const newOrder: SupplierOrder = await createSupplierOrder(
					product.supplier_id
				);
				finalOrder = { ...newOrder, order_date: new Date(newOrder.order_date) };
			} else {
				finalOrder = { ...order[0], order_date: new Date(order[0].order_date) };
			}
			await addProductToSupplierOrder(
				finalOrder.supplier_order_id,
				product.product_id
			);
			navigate(`/supplier_orders`, {
				state: {
					order: finalOrder,
				},
			});
		} catch (e) {
			console.log(e);
		}
	};

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
					<Button action={() => handleOrderPerProduct()}>Order More</Button>
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
