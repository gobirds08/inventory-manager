import FilterView from "../components/filter_view/FilterView";
import ProductView from "../components/product_view/ProductView";
import { Product, defaultProduct } from "../models/Product";
import Category from "../models/Category";
import { useEffect, useState } from "react";
import { fetchProducts, fetchCategories } from "../utilities/FetchData";

function Products() {
	const [filterToggle, setFilterToggle] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");
	const [category_id, setCategoryID] = useState<number>(0);
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);

	const handleToggle = () => {
		setFilterToggle((prevState) => !prevState);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		console.log(e.target.value);
		setCategoryID(parseInt(e.target.value));
	};

	useEffect(() => {
		const fetchData = async () => {
			const products: Product[] = await fetchProducts({
				search,
				category_id,
			});
			setProducts(products);
		};
		fetchData();
	}, [filterToggle]);

	useEffect(() => {
		const fetchData = async () => {
			const categories = await fetchCategories();
			setCategories(categories);
		};
		fetchData();
	}, []);

	return (
		<>
			<FilterView
				search={search}
				category_id={category_id}
				categories={categories}
				handleToggle={handleToggle}
				handleSearchChange={handleSearchChange}
				handleCategoryChange={handleCategoryChange}
			/>
			<div className="container">
				{products.map((product) => (
					<ProductView key={product.product_id} product={product} />
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
