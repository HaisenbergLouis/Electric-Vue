# 优品商城 API 接口文档（草案）

> 版本：v0.1（草案）
> 状态：待前后端确认后定稿
> 配套页面：`src/view/` 下所有页面

---

## 1. 通用约定

### 1.1 基础信息

| 项       | 说明                                                          |
| -------- | ------------------------------------------------------------- |
| Base URL | `http://localhost:8080/api`（开发环境，可通过 Vite 代理转发） |
| 数据格式 | `application/json; charset=utf-8`                             |
| 字符编码 | UTF-8                                                         |
| 鉴权方式 | `Authorization: Bearer <token>`（登录后返回）                 |

### 1.2 统一响应格式

所有接口返回统一结构：

```json
{
  "code": 0,
  "message": "ok",
  "data": {}
}
```

- `code`：`0` 表示成功，非 `0` 表示失败
- `message`：提示信息，前端可直接用于 `ElMessage`
- `data`：业务数据，成功时返回

### 1.3 错误码约定

| code | 含义                  | 前端处理建议       |
| ---- | --------------------- | ------------------ |
| 0    | 成功                  | -                  |
| 1001 | 参数错误              | 校验表单后重新提交 |
| 1002 | 未登录 / token 失效   | 跳转登录页         |
| 2001 | 用户名或密码错误      | 提示用户           |
| 2002 | 用户名已存在          | 提示用户换一个     |
| 3001 | 商品不存在            | 返回列表页         |
| 4001 | 购物车为空 / 库存不足 | 提示用户           |

### 1.4 分页参数

列表类接口统一使用：

| 参数     | 类型   | 必填 | 说明              |
| -------- | ------ | ---- | ----------------- |
| page     | number | 否   | 页码，默认 1      |
| pageSize | number | 否   | 每页条数，默认 10 |

---

## 2. 认证模块（登录 / 注册）

### 2.1 用户注册

- **POST** `/auth/register`
- 说明：注册新用户（对应 `Register.vue`）

**请求体：**

```json
{
  "username": "zhangsan",
  "password": "123456",
  "confirmPassword": "123456"
}
```

**成功响应：**

```json
{
  "code": 0,
  "message": "注册成功",
  "data": {
    "id": 1,
    "username": "zhangsan"
  }
}
```

### 2.2 用户登录

- **POST** `/auth/login`
- 说明：登录并获取 token（对应 `Login.vue`）

**请求体：**

```json
{
  "username": "zhangsan",
  "password": "123456"
}
```

**成功响应：**

```json
{
  "code": 0,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "userInfo": {
      "id": 1,
      "username": "zhangsan",
      "avatar": "https://example.com/avatar.png"
    }
  }
}
```

### 2.3 获取当前用户信息

- **GET** `/auth/me`
- 说明：通过 token 获取当前登录用户信息（用于刷新页面后恢复登录态）

**请求头：**

```
Authorization: Bearer <token>
```

**成功响应：**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "id": 1,
    "username": "zhangsan",
    "avatar": "https://example.com/avatar.png",
    "phone": "13800000000"
  }
}
```

### 2.4 退出登录

- **POST** `/auth/logout`
- 说明：退出登录，使 token 失效

**成功响应：**

```json
{
  "code": 0,
  "message": "退出成功",
  "data": null
}
```

---

## 3. 商品模块

### 3.1 商品列表（全部商品）

- **GET** `/goods`
- 说明：获取商品列表，支持关键词搜索与分页（对应 `Goods.vue`）

**查询参数：**

| 参数     | 类型   | 必填 | 说明                            |
| -------- | ------ | ---- | ------------------------------- |
| keyword  | string | 否   | 关键词，模糊匹配商品名          |
| category | string | 否   | 分类，如 `digital`、`household` |
| page     | number | 否   | 页码，默认 1                    |
| pageSize | number | 否   | 每页条数，默认 10               |

**成功响应：**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "list": [
      {
        "id": "1001",
        "name": "无线蓝牙耳机",
        "price": 199,
        "pic": "https://example.com/pic/1001.jpg",
        "sales": 1234
      }
    ],
    "total": 86,
    "page": 1,
    "pageSize": 10
  }
}
```

### 3.2 商品详情

- **GET** `/goods/:id`
- 说明：获取单个商品完整信息（对应 `GoodsDetail.vue`，替换现有模拟数据）

**成功响应：**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "id": "1001",
    "name": "高性能无线蓝牙耳机 降噪长续航",
    "price": 199,
    "originalPrice": 299,
    "pic": "https://example.com/pic/1001.jpg",
    "desc": "主动降噪，蓝牙5.3，续航30小时，高清通话",
    "detail": "商品详情富文本/长图描述",
    "stock": 99,
    "sales": 1234
  }
}
```

> 字段与 `GoodsDetail.vue` 中 `GoodsItem` 接口结构对齐，可直接替换。

### 3.3 新品上市

- **GET** `/goods/new`
- 说明：获取新品列表（对应 `NewGoods.vue`）

**成功响应：** 结构同 3.1，`data.list` 为新上架商品。

### 3.4 限时特惠

- **GET** `/goods/discount`
- 说明：获取限时特惠/秒杀商品（对应 `LimitSpecial.vue`）

**成功响应：**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "list": [
      {
        "id": "2001",
        "name": "电竞鼠标",
        "price": 89,
        "originalPrice": 159,
        "pic": "https://example.com/pic/2001.jpg",
        "endTime": "2026-08-04 23:59:59"
      }
    ]
  }
}
```

### 3.5 搜索商品

- **GET** `/goods/search`
- 说明：按关键词搜索商品（对应 Navbar 搜索框）

**查询参数：**

| 参数    | 类型   | 必填 | 说明       |
| ------- | ------ | ---- | ---------- |
| keyword | string | 是   | 搜索关键词 |

**成功响应：** 结构同 3.1。

> 若后端希望简化，也可去掉该接口，由 3.1 的 `keyword` 参数承担搜索功能。

---

## 4. 购物车模块

> 需要登录，请求头携带 `Authorization: Bearer <token>`。对应 `Cart.vue`。

### 4.1 获取购物车列表

- **GET** `/cart`

**成功响应：**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "items": [
      {
        "id": "cart_item_1",
        "goodsId": "1001",
        "name": "无线蓝牙耳机",
        "pic": "https://example.com/pic/1001.jpg",
        "price": 199,
        "count": 2,
        "checked": true
      }
    ],
    "totalCount": 2,
    "totalPrice": 398
  }
}
```

### 4.2 加入购物车

- **POST** `/cart`
- 说明：加入购物车（替换 `GoodsDetail.vue` 中 `addCart` 的模拟逻辑）

**请求体：**

```json
{
  "goodsId": "1001",
  "count": 1
}
```

**成功响应：**

```json
{
  "code": 0,
  "message": "已加入购物车",
  "data": null
}
```

### 4.3 修改购物车商品数量

- **PUT** `/cart/:cartItemId`
- 说明：修改某个购物车条目的数量

**请求体：**

```json
{
  "count": 3
}
```

### 4.4 勾选 / 取消勾选

- **PUT** `/cart/:cartItemId/checked`

**请求体：**

```json
{
  "checked": true
}
```

### 4.5 删除购物车商品

- **DELETE** `/cart/:cartItemId`

### 4.6 清空购物车

- **DELETE** `/cart`

---

## 5. 订单模块（预留）

> 当前项目尚未实现订单页面，以下接口为后续扩展预留。

### 5.1 创建订单

- **POST** `/orders`
- 说明：从购物车结算生成订单

**请求体：**

```json
{
  "cartItemIds": ["cart_item_1", "cart_item_2"],
  "receiver": {
    "name": "张三",
    "phone": "13800000000",
    "address": "北京市朝阳区xx路xx号"
  }
}
```

### 5.2 订单列表

- **GET** `/orders`
- 说明：查询当前用户订单，支持 `status` 过滤（对应规划中的"我的订单"页面）

### 5.3 订单详情

- **GET** `/orders/:id`

---

## 6. 前端对接建议（Vite 代理）

开发阶段建议在 `vite.config.ts` 配置代理，避免跨域：

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
}
```

前端请求统一走 `/api/...` 前缀，由 Vite 转发到后端。

---

## 7. 待确认事项

- [ ] 商品分类（category）枚举值是否需要
- [ ] 购物车是否需要"全选 / 批量删除"
- [ ] 是否引入优惠券、满减
- [ ] 订单模块本期是否实现
- [ ] 用户头像 / 手机号字段是否本期需要
