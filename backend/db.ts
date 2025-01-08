import { Pool } from "pg";
import { dbConfig } from "./config";

const pool = new Pool(dbConfig);

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
