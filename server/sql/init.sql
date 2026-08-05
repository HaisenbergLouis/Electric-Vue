-- ========== 优品商城数据库初始化 ==========
CREATE DATABASE IF NOT EXISTS mall DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mall;

-- 商品表（对齐前端 GoodsItem）
CREATE TABLE IF NOT EXISTS goods (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  pic VARCHAR(255) NOT NULL DEFAULT '',
  `desc` VARCHAR(255) NOT NULL DEFAULT '',
  detail TEXT,
  stock INT NOT NULL DEFAULT 0,
  sales INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 用户表（对齐前端 UserInfo，密码仅示例用）
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  avatar VARCHAR(255) NOT NULL DEFAULT '',
  phone VARCHAR(20) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 购物车表
CREATE TABLE IF NOT EXISTS cart (
  id VARCHAR(50) PRIMARY KEY,
  user_id INT NOT NULL,
  goods_id VARCHAR(20) NOT NULL,
  count INT NOT NULL DEFAULT 1,
  checked TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========== 示例商品数据（和前端 mock 一致）==========
INSERT INTO goods (id, name, price, original_price, pic, `desc`, detail, stock, sales) VALUES
('1001', '无线蓝牙耳机', 199.00, 299.00, 'https://picsum.photos/seed/g1001/420/420', '蓝牙5.3，续航30小时，高清通话', '主动降噪，蓝牙5.3连接，续航30小时，支持高清通话，佩戴舒适。', 99, 1234),
('1002', '机械键盘', 349.00, 449.00, 'https://picsum.photos/seed/g1002/420/420', '87键RGB背光，青轴手感', '87键紧凑布局，RGB背光，青轴机械手感，全键无冲，Type-C 键线分离。', 50, 856),
('1003', '电竞鼠标', 89.00, 159.00, 'https://picsum.photos/seed/g1003/420/420', '16000DPI，人体工学设计', '16000DPI 高精度传感器，人体工学握感，RGB 灯效，7键宏定义。', 120, 2100),
('1004', '智能手表', 899.00, 1099.00, 'https://picsum.photos/seed/g1004/420/420', '血氧心率监测，14天长续航', '血氧/心率/睡眠监测，14天超长续航，5ATM防水，支持运动模式。', 30, 432),
('1005', '便携充电宝', 79.00, 129.00, 'https://picsum.photos/seed/g1005/420/420', '20000mAh，22.5W快充', '20000mAh 大容量，22.5W 双向快充，双口输出，可上飞机。', 200, 3560),
('1006', '降噪耳机 Pro', 499.00, 699.00, 'https://picsum.photos/seed/g1006/420/420', '旗舰级主动降噪，Hi-Fi音质', '旗舰级 -45dB 主动降噪，Hi-Fi 高解析音质，40小时综合续航。', 45, 967),
('1007', '4K显示器', 1299.00, 1599.00, 'https://picsum.photos/seed/g1007/420/420', '27英寸 4K IPS，专业色彩', '27英寸 4K IPS 面板，99% sRGB 色域，Type-C 65W 反向充电。', 20, 289),
('1008', '蓝牙音箱', 259.00, 329.00, 'https://picsum.photos/seed/g1008/420/420', '360°环绕音效，IPX7防水', '360° 环绕立体声，IPX7 防水，双设备连接，18小时续航。', 80, 1204);

-- 示例用户
INSERT INTO users (username, password, avatar, phone) VALUES
('zhangsan', '123456', '', '13800000000');
