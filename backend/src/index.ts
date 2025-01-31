import express from "express";
import { query } from "../db";
import cors from "cors";

const app = express();
const PORT = 3001;

const allowedOrigins = [
	"http://localhost:5173",
	"https://frontend_placeholder",
];

app.use(express.json());

const corsOptions: cors.CorsOptions = {
	origin: (origin: any, callback: any) => {
		// use 'origin &&' after testing locally
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
};

app.use(cors(corsOptions));

// Get Product
app.get("/product/:product_id", async (req, res) => {
	const product_id = parseInt(req.params.product_id);
	try {
		const q = `SELECT *
               FROM Products
               WHERE product_id = $1`;
		const result = await query(q, [product_id]);
		res.json(result.rows);
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error retrieving product: ${product_id}`);
		console.error(e);
	}
});

app.get("/products", async (req, res) => {
	const { search, category_id } = req.query;
	try {
		let q = `SELECT *
             FROM Products
             WHERE 1 = 1`;
		if (search) {
			q += ` AND LOWER(product_name) LIKE LOWER('%${search}%')`;
		}
		if (category_id) {
			q += ` AND category_id = ${category_id}`;
		}
		const result = await query(q);
		res.json(result.rows);
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error retrieving products`);
	}
});

// Get All Products In A Category
app.get("/all_products/:category_id", async (req, res) => {
	const category_id = parseInt(req.params.category_id);
});

// Add Product
app.post("/product", async (req, res) => {
	const {
		product_name,
		category_id,
		supplier_id,
		price_per_unit,
		description,
		image_url,
	} = req.body;
	try {
		const q = `INSERT INTO Products (product_name, category_id, supplier_id, price_per_unit, description, image_url)
               VALUES ($1, $2, $3, $4, $5, $6)`;
		await query(q, [
			product_name,
			category_id,
			supplier_id,
			price_per_unit,
			description,
			image_url,
		]);

		res.json("Success");
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error adding product: ${product_name}`);
	}
});

// Update Product

// Remove Product
app.delete("/product/:product_id", async (req, res) => {
	const product_id = parseInt(req.params.product_id);
	try {
		const q = `DELETE FROM Products
               WHERE product_id = $1`;
		await query(q, [product_id]);
		res.json("Success");
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error deleting product: ${product_id}`);
	}
});

// Get All Categories
app.get("/category", async (req, res) => {
	try {
		const q = `SELECT *
               FROM Categories`;
		const result = await query(q);
		res.json(result.rows);
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error retrieving categories`);
	}
});

// Add Category
app.post("/category", async (req, res) => {
	const { category_name, description } = req.body;
	try {
		const q = `INSERT INTO Categories (category_name, description)
               VALUES ($1, $2)`;
		await query(q, [category_name, description]);
		res.json("Success");
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error adding category: ${category_name}`);
	}
});

// Remove Category
app.delete("/category/:category_id", async (req, res) => {
	const category_id = parseInt(req.params.category_id);
	try {
		const q = `DELETE FROM Categories
               WHERE category_id = $1`;
		await query(q, [category_id]);
		res.json("Success");
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error deleting category: ${category_id}`);
	}
});

// Get All Suppliers
app.get("/supplier", async (req, res) => {
	try {
		const q = `SELECT *
               FROM Suppliers`;
		const result = await query(q);
		res.json(result.rows);
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error retrieving suppliers`);
	}
});

// Add Supplier
app.post("/supplier", async (req, res) => {
	const { supplier_name, contact_name, contact_email, contact_phone } =
		req.body;
	try {
		const q = `INSERT INTO Suppliers (supplier_name, contact_name, contact_email, contact_phone)
               VALUES ($1, $2, $3, $4)`;
		await query(q, [supplier_name, contact_name, contact_email, contact_phone]);
		res.json("Success");
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error adding supplier: ${supplier_name}`);
	}
});

// Remove Supplier
app.delete("/supplier/:supplier_id", async (req, res) => {
	const supplier_id = parseInt(req.params.supplier_id);
	try {
		const q = `DELETE FROM Suppliers
               WHERE supplier_id = $1`;
		await query(q, [supplier_id]);
		res.json("Success");
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error deleting supplier: ${supplier_id}`);
	}
});

// Get Customer(s) From Email Or Phone
app.get("/customer/:customer_contact", async (req, res) => {
	let customer_contact: string | number;
	let query_col: string;
	try {
		customer_contact = parseInt(req.params.customer_contact);
		query_col = "contact_phone";
	} catch {
		customer_contact = req.params.customer_contact;
		query_col = "contact_email";
	}
	try {
		const q = `SELECT *
               FROM Customers
               WHERE $1 = $2`;
		const result = await query(q, [query_col, customer_contact]);
		res.json(result.rows);
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error retrieving customer`);
	}
});

// Add Customer
app.post("/customer", async (req, res) => {
	const { customer_name, contact_email, contact_phone } = req.body;
	try {
		const q = `INSERT INTO Customers (customer_name, contact_email, contact_phone)
               VALUES ($1, $2, $3)`;
		await query(q, [customer_name, contact_email, contact_phone]);
		res.json("Success");
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error adding customer: ${customer_name}`);
	}
});

// Update Customer
app.put("/customer", async (req, res) => {
	const { customer_id, customer_name, contact_email, contact_phone } = req.body;
	try {
		const q = `UPDATE Customers
               SET customer_name = $1, contact_email = $2, contact_phone = $3
               WHERE customer_id = $4`;
		await query(q, [customer_name, contact_email, contact_phone, customer_id]);
		res.json("Success");
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error updating customer: ${customer_id}`);
	}
});

// Get Most Recent Order For Customer
app.get("/order/:customer_id", async (req, res) => {
	const customer_id = parseInt(req.params.customer_id);
	try {
		const q = `SELECT *
               FROM Orders
               WHERE customer_id = $1
               ORDER BY order_date DESC
               LIMIT 1`;
		const result = await query(q, [customer_id]);
		res.json(result.rows);
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error retrieving customer`);
	}
});

// Add Order
app.post("/order", async (req, res) => {
	const { customer_id, order_date, total_amount } = req.body;
	try {
		const q = `INSERT INTO Orders (customer_id, order_date, total_amount)
               VALUES ($1, $2, $3)`;
		await query(q, [customer_id, order_date, total_amount]);
		res.json("Success");
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(
			`Error adding order from customer ${customer_id} on ${order_date}`
		);
	}
});

// Get All OrderDetails For One Order
app.get("/order_details/:order_id", async (req, res) => {
	const order_id = parseInt(req.params.order_id);
	try {
		const q = `SELECT *
               FROM OrderDetails
               WHERE order_id = $1`;
		const result = await query(q, [order_id]);
		res.json(result.rows);
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error retrieving customer`);
	}
});

// Add OrderDetails
app.post("/order_details", async (req, res) => {
	const { order_id, product_id, quantity, price } = req.body;
	try {
		const q = `INSERT INTO OrderDetails (order_id, product_id, quantity, price)
               VALUES ($1, $2, $3, $4)`;
		await query(q, [order_id, product_id, quantity, price]);
		res.json("Success");
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(
			`Error adding order detail from order id: ${order_id} and product id: ${product_id}`
		);
	}
});

// Get All Supplier Orders
app.get("/supplier_orders", async (req, res) => {
	try {
		const q = `SELECT *
			   FROM SupplierOrders`;
		const result = await query(q);
		res.json(result.rows);
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error retrieving supplier orders`);
	}
});

// Add Supplier Order
app.post("/supplier_order", async (req, res) => {
	const { supplier_id, order_date } = req.body;
	try {
		const q = `INSERT INTO SupplierOrders (supplier_id, order_date)
			   VALUES ($1, $2)`;
		await query(q, [supplier_id, order_date]);
		res.json("Success");
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error adding supplier order`);
	}
});

// Add Supplier Order Details
app.post("/supplier_order_details", async (req, res) => {
	const { supplier_order_id, product_id, quantity } = req.body;
	try {
		const q = `INSERT INTO SupplierOrderDetails (supplier_order_id, product_id, quantity)
			   VALUES ($1, $2, $3)`;
		await query(q, [supplier_order_id, product_id, quantity]);
		res.json("Success");
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error adding supplier order detail`);
	}
});

// Get All Supplier Order Details
app.get("/supplier_orders/:supplier_order_id/products", async (req, res) => {
	const supplier_order_id = parseInt(req.params.supplier_order_id);
	try {
		const q = `SELECT *
			   FROM SupplierOrderDetails
			   WHERE supplier_order_id = $1`;
		const result = await query(q, [supplier_order_id]);
		res.json(result.rows);
	} catch (e) {
		res.status(500).json({ error: "Internal Server Error" });
		console.error(`Error retrieving supplier order details`);
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
