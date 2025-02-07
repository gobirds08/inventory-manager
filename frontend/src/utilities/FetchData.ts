import { Product } from "../models/Product";
import Category from "../models/Category";
import { SupplierOrder } from "../models/SupplierOrders";
import { SupplierOrderDetail } from "../models/SupplierOrderDetails";

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

export async function fetchSupplierOrders(): Promise<SupplierOrder[]> {
	try {
		const response = await fetch("http://localhost:3001/supplier_orders");
		if (!response.ok) {
			throw new Error("Failed to fetch supplier orders");
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

export async function fetchSupplyOrderDetailsFromSupplierOrderID(
	supplier_order_id: number
): Promise<SupplierOrderDetail[]> {
	try {
		const response = await fetch(
			`http://localhost:3001/supplier_orders/${supplier_order_id}/products`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch supplier order details");
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

export async function fetchProductByID(product_id: number): Promise<Product> {
	try {
		const response = await fetch(`http://localhost:3001/product/${product_id}`);
		if (!response.ok) {
			throw new Error("Failed to fetch product");
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

export async function updateSupplierOrderStatus(
	supplier_order_id: number
): Promise<void> {
	try {
		const response = await fetch(
			`http://localhost:3001/supplier_order/status/${supplier_order_id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ordered: true }),
			}
		);
		if (!response.ok) {
			throw new Error("Failed to update supplier order status");
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw new Error("An unknown error occurred");
		}
	}
}

export async function createSupplierOrder(
	supplier_id: number
): Promise<SupplierOrder> {
	try {
		const response = await fetch("http://localhost:3001/supplier_order", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ supplier_id, order_date: new Date() }),
		});
		if (!response.ok) {
			throw new Error("Failed to create supplier order");
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

export async function addProductToSupplierOrder(
	supplier_order_id: number,
	product_id: number
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:3001/supplier_order_details",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ supplier_order_id, product_id, quantity: 1 }),
			}
		);
		if (!response.ok) {
			throw new Error("Failed to add product to supplier order");
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw new Error("An unknown error occurred");
		}
	}
}

export async function getSupplierOrdersFromSupplierIDAndNotOrdered(
	supplier_id: number
): Promise<SupplierOrder[]> {
	try {
		const response = await fetch(
			`http://localhost:3001/supplier_orders/${supplier_id}/not_ordered`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch supplier orders");
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

export async function updateQuantityOfSupplierOrderDetail(
	positiveChange: number,
	supplier_order_detail_id: number
): Promise<void> {
	if (!Number.isInteger(positiveChange)) {
		return;
	}
	try {
		const response = await fetch(
			`http://localhost:3001/supplier_order_details/update_quantity`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ positiveChange, supplier_order_detail_id }),
			}
		);
		if (!response.ok) {
			throw new Error("Failed to add product to supplier order");
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw new Error("An unknown error occurred");
		}
	}
}
