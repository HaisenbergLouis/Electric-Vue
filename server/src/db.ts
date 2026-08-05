import { fileURLToPath } from "node:url";
import path from "node:path";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

// 无论从哪个目录启动，都能定位到 server/.env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// 创建 MySQL 连接池（连接池 = 一批可复用的连接，比每次新建高效）
export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "mall",
  waitForConnections: true,
  connectionLimit: 10,
});

// 测试连接是否成功
export async function testConnection() {
  await pool.query("SELECT 1 AS ok");
  console.log("✅ MySQL 连接成功");
}
