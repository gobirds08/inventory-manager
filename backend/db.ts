import { Pool } from "pg";
import { dbConfig } from "./config";

const pool = new Pool({
  connectionString: dbConfig.connectionString,
  ssl: {
    rejectUnauthorized: false, 
  },
})

export const query = async (text: string, params?: any[]) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error("Database error:", error);
    throw error; 
  }
};
