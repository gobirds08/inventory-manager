import express from "express";
import { query } from "../db";

const app = express();
const PORT = 3001;

//
app.get("/", async (req, res) => {
  const result = await query("");
  res.send("Hello from the backend!");
});

// Get Product

// Add Product

// Update Product

// Remove Product

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
