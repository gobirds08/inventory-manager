import { Product } from "../models/Product";
import Category from "../models/Category";

interface FetchProductsProps {
	search: string | null;
	category_id: number | null;
}

export async function fetchProducts({
	search,
	category_id,
}: FetchProductsProps): Promise<Product[]> {
	try {
		let url = `http://localhost:3001/products?search=${search}`;

		if (category_id != 0) {
			url += `&category_id=${category_id}`;
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

export async function fetchCategories(): Promise<Category[]> {
	try {
		const response = await fetch("http://localhost:3001/category");
		if (!response.ok) {
			throw new Error("Failed to fetch categories");
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
