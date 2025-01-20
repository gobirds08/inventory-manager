import FilterView from "../components/filter_view/FilterView";
import ProductView from "../components/product_view/ProductView";
import { Product, defaultProduct } from "../models/Product";
import { useEffect, useState } from "react";
import fetchProducts from "../utilities/FetchData";

function Products() {
	const [filterToggle, setFilterToggle] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");
	const [category_id, setCategoryID] = useState<number | null>(null);
	const [products, setProducts] = useState<Product[]>([]);

	const handleToggle = () => {
		setFilterToggle((prevState) => !prevState);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategoryID(parseInt(e.target.value));
	};

	useEffect(() => {
		const fetchData = async () => {
			const products: Product[] = await fetchProducts({
				search,
				category_id: "",
			});
			setProducts(products);
		};
		fetchData();
	}, [filterToggle]);

	return (
		<>
			<FilterView
				search={search}
				category_id={category_id}
				handleToggle={handleToggle}
				handleSearchChange={handleSearchChange}
			/>
			<div className="container">
				{products.map((product) => (
					<ProductView product={product} />
				))}
				<ProductView product={defaultProduct} />
				<ProductView product={defaultProduct} />
				<ProductView product={defaultProduct} />
				<ProductView product={defaultProduct} />
				<ProductView product={defaultProduct} />
				<ProductView product={defaultProduct} />
				<ProductView product={defaultProduct} />
			</div>
		</>
	);
}

export default Products;
