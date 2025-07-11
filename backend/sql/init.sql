-- 创建数据库
CREATE DATABASE cultural_heritage;

-- 连接到数据库
\c cultural_heritage;

-- 创建扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 创建用户表
CREATE TABLE USERS (
  ID VARCHAR2(36) PRIMARY KEY,
  NAME VARCHAR2(50) NOT NULL,
  EMAIL VARCHAR2(100) NOT NULL UNIQUE,
  PASSWORD VARCHAR2(100) NOT NULL,
  ROLE VARCHAR2(20) NOT NULL DEFAULT 'user',
  CREATED_AT TIMESTAMP DEFAULT SYSDATE,
  UPDATED_AT TIMESTAMP DEFAULT SYSDATE
);

-- 创建文化遗产分类表
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 创建文化遗产表
CREATE TABLE HERITAGE (
  ID VARCHAR2(36) PRIMARY KEY,
  NAME VARCHAR2(255) NOT NULL,
  DESCRIPTION CLOB,
  LOCATION VARCHAR2(255),
  CATEGORY_ID VARCHAR2(36),
  IMAGES VARCHAR2(4000),
  CREATED_AT TIMESTAMP DEFAULT SYSDATE,
  UPDATED_AT TIMESTAMP DEFAULT SYSDATE
);

-- 创建故事表
CREATE TABLE STORIES (
  ID VARCHAR2(36) PRIMARY KEY,
  TITLE VARCHAR2(255) NOT NULL,
  CONTENT CLOB,
  HERITAGE_ID VARCHAR2(36),
  AUTHOR_ID VARCHAR2(36),
  LIKES NUMBER DEFAULT 0,
  CREATED_AT TIMESTAMP DEFAULT SYSDATE,
  UPDATED_AT TIMESTAMP DEFAULT SYSDATE,
  FOREIGN KEY (HERITAGE_ID) REFERENCES HERITAGE(ID),
  FOREIGN KEY (AUTHOR_ID) REFERENCES USERS(ID)
);

-- 创建故事点赞表
CREATE TABLE STORY_LIKES (
  STORY_ID VARCHAR2(36),
  USER_ID VARCHAR2(36),
  CREATED_AT TIMESTAMP DEFAULT SYSDATE,
  PRIMARY KEY (STORY_ID, USER_ID),
  FOREIGN KEY (STORY_ID) REFERENCES STORIES(ID),
  FOREIGN KEY (USER_ID) REFERENCES USERS(ID)
);

-- 创建商品表
CREATE TABLE PRODUCTS (
  ID VARCHAR2(36) PRIMARY KEY,
  NAME VARCHAR2(255) NOT NULL,
  DESCRIPTION CLOB,
  PRICE NUMBER(10,2) NOT NULL,
  CATEGORY_ID VARCHAR2(36),
  IMAGES VARCHAR2(4000),
  STOCK NUMBER DEFAULT 0,
  CREATED_AT TIMESTAMP DEFAULT SYSDATE,
  UPDATED_AT TIMESTAMP DEFAULT SYSDATE
);

-- 创建订单表
CREATE TABLE ORDERS (
  ID VARCHAR2(36) PRIMARY KEY,
  USER_ID VARCHAR2(36),
  TOTAL_AMOUNT NUMBER(10,2) NOT NULL,
  STATUS VARCHAR2(20) DEFAULT 'pending',
  SHIPPING_ADDRESS CLOB,
  PAYMENT_METHOD VARCHAR2(20),
  CREATED_AT TIMESTAMP DEFAULT SYSDATE,
  UPDATED_AT TIMESTAMP DEFAULT SYSDATE,
  FOREIGN KEY (USER_ID) REFERENCES USERS(ID)
);

-- 创建订单项表
CREATE TABLE ORDER_ITEMS (
  ID VARCHAR2(36) PRIMARY KEY,
  ORDER_ID VARCHAR2(36),
  PRODUCT_ID VARCHAR2(36),
  QUANTITY NUMBER NOT NULL,
  PRICE NUMBER(10,2) NOT NULL,
  CREATED_AT TIMESTAMP DEFAULT SYSDATE,
  FOREIGN KEY (ORDER_ID) REFERENCES ORDERS(ID),
  FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCTS(ID)
);

-- 创建触发器：更新用户表的更新时间
CREATE OR REPLACE TRIGGER USERS_UPDATE_TRIGGER
BEFORE UPDATE ON USERS
FOR EACH ROW
BEGIN
  :NEW.UPDATED_AT := SYSDATE;
END;
/

-- 创建触发器：更新文化遗产表的更新时间
CREATE OR REPLACE TRIGGER HERITAGE_UPDATE_TRIGGER
BEFORE UPDATE ON HERITAGE
FOR EACH ROW
BEGIN
  :NEW.UPDATED_AT := SYSDATE;
END;
/

-- 创建触发器：更新故事表的更新时间
CREATE OR REPLACE TRIGGER STORIES_UPDATE_TRIGGER
BEFORE UPDATE ON STORIES
FOR EACH ROW
BEGIN
  :NEW.UPDATED_AT := SYSDATE;
END;
/

-- 创建触发器：更新商品表的更新时间
CREATE OR REPLACE TRIGGER PRODUCTS_UPDATE_TRIGGER
BEFORE UPDATE ON PRODUCTS
FOR EACH ROW
BEGIN
  :NEW.UPDATED_AT := SYSDATE;
END;
/

-- 创建触发器：更新订单表的更新时间
CREATE OR REPLACE TRIGGER ORDERS_UPDATE_TRIGGER
BEFORE UPDATE ON ORDERS
FOR EACH ROW
BEGIN
  :NEW.UPDATED_AT := SYSDATE;
END;
/

-- 插入示例数据
INSERT INTO categories (name, description) VALUES
('非物质文化遗产', '包括传统技艺、表演艺术、节庆活动等'),
('物质文化遗产', '包括历史建筑、文物、遗址等'),
('自然遗产', '包括自然景观、地质地貌等');

-- 创建管理员用户（密码：admin123）
INSERT INTO USERS (ID, NAME, EMAIL, PASSWORD, ROLE) VALUES
('admin', '管理员', 'admin@example.com', '$2a$10$rM7Qx7K9zQ8K9zQ8K9zQ8O9zQ8K9zQ8K9zQ8K9zQ8K9zQ8K9zQ8', 'admin');

-- 插入示例文化遗产
INSERT INTO HERITAGE (ID, NAME, DESCRIPTION, LOCATION, CATEGORY_ID) VALUES
('故宫', '中国明清两代的皇家宫殿，世界上现存规模最大、保存最为完整的木质结构古建筑之一', '北京市东城区', (SELECT id FROM categories WHERE name = '物质文化遗产')),
('京剧', '中国最具代表性的戏曲剧种之一，融合了唱、念、做、打等表演艺术', '全国', (SELECT id FROM categories WHERE name = '非物质文化遗产')),
('黄山', '以奇松、怪石、云海、温泉著称的著名山岳景观', '安徽省黄山市', (SELECT id FROM categories WHERE name = '自然遗产'));

-- 插入示例商品
INSERT INTO PRODUCTS (ID, NAME, DESCRIPTION, PRICE, CATEGORY_ID, STOCK) VALUES
('故宫文创笔记本', '精美故宫文创笔记本，采用传统纹样设计', 39.90, (SELECT id FROM categories WHERE name = '物质文化遗产'), 100),
('京剧脸谱摆件', '传统京剧脸谱摆件，手工制作', 199.00, (SELECT id FROM categories WHERE name = '非物质文化遗产'), 50),
('黄山风景明信片', '黄山风景摄影明信片套装', 29.90, (SELECT id FROM categories WHERE name = '自然遗产'), 200); 