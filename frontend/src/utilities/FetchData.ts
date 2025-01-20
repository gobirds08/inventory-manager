import { Product } from "../models/Product";

interface FetchProductsProps {
	search: string;
	category_id: string;
}

export default async function fetchProducts({
	search,
	category_id,
}: FetchProductsProps): Promise<Product[]> {
	try {
		const response = await fetch(
			`http://localhost:3001/products?search=${search}&category_id=${category_id}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch products");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw new Error("An unknown error occurred");
		}
	}
}
