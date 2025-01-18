export interface Product{
    product_id: number;
    name: string;
    category_id: number;
    supplier_id: number;
    quantity: number;
    unit_price: number;
    description: string;
    image: string;
}

import book_img from "../assets/book_test.png"

export const defaultProduct: Product = {
    product_id: 0,
    name: "Book",
    category_id: 0,
    supplier_id: 0,
    quantity: 0,
    unit_price: 10.99,
    description: "",
    image: book_img
}