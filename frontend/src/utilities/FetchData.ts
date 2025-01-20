import { Product } from "../models/Product";

interface FetchProductsProps {
	search: string | null;
	category: string | null;
}

export default async function fetchProducts({
	search,
	category,
}: FetchProductsProps): Promise<Product[]> {
	try {
		let url = `http://localhost:3001/products?search=${search}`;

		if (category) {
			url += `&category=${category}`;
		}
		const response = await fetch(url);
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
