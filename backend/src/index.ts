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


// Add Category
app.post("/category", async (req, res) => {
  const {category_name, description} = req.body;
  try{
    const q = `INSERT INTO Categories (category_name, description)
               VALUES ($1, $2)`;
    await query(q, [category_name, description])
    res.json("Success");
  }catch(e){
    res.status(500).json({ error: "Internal Server Error" });
    console.error(`Error adding category: ${category_name}`);
  }
});

// Remove Category
app.delete("/category/:category_id", async (req, res) => {
  const category_id = req.params.category_id;
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


// Add Supplier
app.post("/supplier", async (req, res) => {
  const {supplier_name, contact_name, contact_email, contact_phone} = req.body;
  try{
    const q = `INSERT INTO Suppliers (supplier_name, contact_name, contact_email, contact_phone)
               VALUES ($1, $2, $3, $4)`;
    await query(q, [supplier_name, contact_name, contact_email, contact_phone])
    res.json("Success");
  }catch(e){
    res.status(500).json({ error: "Internal Server Error" });
    console.error(`Error adding supplier: ${supplier_name}`);
  }
});

// Remove Supplier
app.delete("/supplier/:supplier_id", async (req, res) => {
  const supplier_id = req.params.supplier_id;
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


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
