import { Product } from "../../models/Product";
import { useEffect, useState } from "react";
import { SupplierOrderDetail } from "../../models/SupplierOrderDetails";
import ProductView from "../product_view/ProductView";
import { fetchProductByID } from "../../utilities/FetchData";

interface PopUpCardBarProps {
	supplier_order_details: SupplierOrderDetail[];
}

function PopUpCardBar({ supplier_order_details }: PopUpCardBarProps) {
	const [products, setProducts] = useState<Product[]>([]);
	const [firstProductIndex, setFirstProductIndex] = useState<number>(0);
	const [isSliding, setIsSliding] = useState(false);
	const [slideDirection, setSlideDirection] = useState<"left" | "right" | "">(
		""
	);
	const numProductsToShow = 2;

	function handleArrowClick(left: boolean) {
		if (isSliding) return;

		if (left) {
			if (firstProductIndex === 0 || products.length <= numProductsToShow) {
				return;
			}
			setSlideDirection("right");
			setIsSliding(true);

			setTimeout(() => {
				setFirstProductIndex(firstProductIndex - 1);
				setIsSliding(false);
			}, 300);
		} else {
			if (
				firstProductIndex === products.length - numProductsToShow ||
				products.length <= numProductsToShow
			) {
				return;
			}
			setSlideDirection("left");
			setIsSliding(true);

			setTimeout(() => {
				setFirstProductIndex(firstProductIndex + 1);
				setIsSliding(false);
			}, 300);
		}
	}

	useEffect(() => {
		const fetchAllProducts = async () => {
			const temp_products: Product[] = await Promise.all(
				supplier_order_details.map(async (details) => {
					const product = await fetchProductByID(details.product_id);
					return product;
				})
			);
			setProducts(temp_products);
		};
		fetchAllProducts();
	}, [supplier_order_details]);

	return (
		<div className="flex-center">
			{products.length > numProductsToShow && firstProductIndex != 0 && (
				<button className="arrow" onClick={() => handleArrowClick(true)}>
					&#8592;
				</button>
			)}
			<div className="flex-center product-slider">
				<div className={`product-list ${isSliding ? slideDirection : ""}`}>
					{products.length === 0 ? (
						<p>No products available</p>
					) : (
						products
							.slice(firstProductIndex, firstProductIndex + numProductsToShow)
							.map((product, index) => {
								return (
									<ProductView
										key={`${product.product_id}-${index}`}
										product={product}
									/>
								);
							})
					)}
				</div>
			</div>
			{products.length > numProductsToShow &&
				firstProductIndex != products.length - numProductsToShow && (
					<button className="arrow" onClick={() => handleArrowClick(false)}>
						&#8594;
					</button>
				)}
		</div>
	);
}

export default PopUpCardBar;
