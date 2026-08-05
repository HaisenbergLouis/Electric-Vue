import { Router } from "express";
import type { RowDataPacket } from "mysql12";
import { pool } from "../db";

const router = Router();

// ⚠️ 重点：静态路由（/new、/discount）必须写在 /:id 之前！
// 否则 /goods/new 会被 /:id 当成 id='new' 匹配，导致返回"商品不存在"

// GET /api/goods 商品列表（支持关键词搜索 + 分页）
router.get("/", async (req, res) => {
  // 从 URL 查询参数取值（都是字符串，需要转数字）
  const { keyword = "", page = "1", pageSize = "10" } = req.query;
  const p = Number(page) || 1;
  const size = Number(pageSize) || 10;
  const like = `%${keyword}%`; // LIKE 模糊匹配：%表示任意字符

  // ① 查总数（带搜索条件）——前端分页条要用
  const [[countRow]] = await pool.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS total FROM goods WHERE name LIKE ?",
    [like],
  );
  const total = Number(countRow.total);

  // ② 查当前页数据（LIMIT 每页几条，OFFSET 跳过几条）
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM goods WHERE name LIKE ? ORDER BY id LIMIT ? OFFSET ?",
    [like, size, (p - 1) * size],
  );

  res.json({
    code: 0,
    message: "ok",
    data: { list: rows, total, page: p, pageSize: size },
  });
});

// GET /api/goods/new 新品上市
router.get("/new", async (req, res) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM goods WHERE id IN ('1004','1006','1007','1008')",
  );
  res.json({
    code: 0,
    message: "ok",
    data: { list: rows, total: rows.length, page: 1, pageSize: rows.length },
  });
});

// GET /api/goods/discount 限时特惠（endTime 先用固定值演示）
router.get("/discount", async (req, res) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT *, '2026-08-10 23:59:59' AS endTime FROM goods WHERE id IN ('1002','1003','1005')",
  );
  res.json({ code: 0, message: "ok", data: { list: rows } });
});

// GET /api/goods/:id 商品详情（必须放在 /new、/discount 之后）
router.get("/:id", async (req, res) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM goods WHERE id = ?",
    [req.params.id],
  );
  if (rows.length === 0) {
    return res.json({ code: 3001, message: "商品不存在", data: null });
  }
  res.json({ code: 0, message: "ok", data: rows[0] });
});

export default router;
