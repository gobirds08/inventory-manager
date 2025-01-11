import express from "express";
import { query } from "../db";

const app = express();
const PORT = 3001;

app.use(express.json());

//
app.get("/", async (req, res) => {
  const result = await query("");
  res.send("Hello from the backend!");
});

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
    console.error(e)
  }
});

// Add Product

app.post("/product", async (req, res) => {
  const {
    product_name,
    category_id,
    supplier_id,
    price_per_unit,
    description,
  } = req.body;
  try {
    const q = `INSERT INTO Products (product_name, category_id, supplier_id, price_per_unit, description)
               VALUES ($1, $2, $3, $4, $5)`;
    await query(q, [
      product_name,
      category_id,
      supplier_id,
      price_per_unit,
      description,
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
  const product_id = req.params.product_id;
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
