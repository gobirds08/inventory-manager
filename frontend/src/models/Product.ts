export interface Product {
	product_id: number;
	product_name: string;
	category_id: number;
	supplier_id: number;
	quantity_in_stock: number;
	price_per_unit: number;
	description: string;
	image_url: string;
}

import book_img from "../assets/book_test.png";

export const defaultProduct: Product = {
	product_id: 0,
	product_name: "Book",
	category_id: 0,
	supplier_id: 0,
	quantity_in_stock: 0,
	price_per_unit: 10.99,
	description: "",
	image_url: book_img,
};
