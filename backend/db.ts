import { Pool } from "pg";
import { dbConfig } from "./config";

// const pool = new Pool(dbConfig);
const pool = new Pool({
  connectionString: dbConfig.connectionString,
  ssl: {
    rejectUnauthorized: false,  // For most cloud providers, this is required
  },
})

export const query = async (text: string, params?: any[]) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error("Database error:", error);
    throw error; // Rethrow the error to handle it in the route
  }
};
