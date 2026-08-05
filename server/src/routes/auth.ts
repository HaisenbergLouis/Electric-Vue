import { Router } from "express";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import jwt from "jsonwebtoken";
import { pool } from "../db";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// POST /api/auth/register 注册
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ code: 1001, message: "参数错误", data: null });
  }

  // ① 查重：用户名已存在就不让注册
  const [exist] = await pool.query<RowDataPacket[]>(
    "SELECT id FROM users WHERE username = ?",
    [username],
  );
  if (exist.length > 0) {
    return res.json({ code: 2002, message: "用户名已存在", data: null });
  }

  // ② 插入新用户（INSERT 返回 result，insertId 是自增主键）
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
  );

  res.json({
    code: 0,
    message: "注册成功",
    data: { id: result.insertId, username },
  });
});

// POST /api/auth/login 登录
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // 按用户名+密码查用户
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
  );
  if (rows.length === 0) {
    return res.json({ code: 2001, message: "用户名或密码错误", data: null });
  }

  const user = rows[0];

  // 签发 token：把用户 id 放进去，7 天过期
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

  res.json({
    code: 0,
    message: "登录成功",
    data: {
      token,
      userInfo: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        phone: user.phone,
      },
    },
  });
});

// GET /api/auth/me 凭 token 获取当前用户信息
router.get("/me", async (req, res) => {
  // 前端会在请求头带：Authorization: Bearer <token>
  const auth = req.headers.authorization || "";
  const token = auth.replace("Bearer ", "");

  try {
    // 验签：能解出来就是合法 token，拿回 { id }
    const payload = jwt.verify(token, JWT_SECRET) as { id: number };

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, username, avatar, phone FROM users WHERE id = ?",
      [payload.id],
    );
    if (rows.length === 0) {
      return res.json({
        code: 1002,
        message: "未登录或登录已过期",
        data: null,
      });
    }
    res.json({ code: 0, message: "ok", data: rows[0] });
  } catch {
    res.json({ code: 1002, message: "未登录或登录已过期", data: null });
  }
});

export default router;
