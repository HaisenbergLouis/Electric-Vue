import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./db";
import goodsRouter from "./routes/goods";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/goods", goodsRouter);

app.get("/api/hello", (req, res) => {
  res.json({ code: 0, message: "ok", data: "后端跑通了" });
});

const PORT = Number(process.env.PORT) || 8080;

// 先测试数据库连接，成功后再启动服务器
testConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ 后端已启动：http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ 数据库连接失败：", err.message);
  });
