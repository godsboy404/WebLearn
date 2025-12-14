# NodeJS及Serverless应用开发实验项目

## 项目简介

基于 NestJS 框架开发的 Node.js 后端应用，实现了用户管理和产品管理功能，支持部署到 Serverless 平台。

## 技术栈

- **后端框架**: NestJS
- **编程语言**: TypeScript
- **数据库**: MongoDB
- **ORM**: Mongoose
- **API文档**: Swagger
- **数据验证**: class-validator

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- MongoDB >= 4.0
- npm >= 8.0.0

### 安装与运行

1. 安装依赖
```bash
npm install --legacy-peer-deps
```

2. 配置环境变量
```bash
# 复制并编辑环境变量文件
cp .env.example .env
# 配置数据库连接等信息
```

3. 启动MongoDB数据库
```bash
mongod
```

4. 启动应用程序
```bash
# 开发模式
npm run start:dev

# 生产模式
npm run build
npm run start:prod
```

5. 访问应用
- API服务: http://localhost:3000
- API文档: http://localhost:3000/api

## 项目结构

```
src/
├── modules/
│   ├── user/          # 用户模块
│   │   ├── schemas/   # 用户数据模型
│   │   ├── dto/       # 数据传输对象
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── user.module.ts
│   ├── product/       # 产品模块
│   │   ├── schemas/
│   │   ├── dto/
│   │   ├── product.controller.ts
│   │   ├── product.service.ts
│   │   └── product.module.ts
│   └── init/          # 初始化模块
├── config/
│   └── database-init.service.ts  # 数据库初始化
├── app.module.ts       # 应用程序根模块
├── main.ts            # 应用程序入口
└── serverless-handler.ts  # Serverless处理程序
```

## API接口

### 用户管理

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /users | 获取所有用户 |
| GET | /users/:id | 根据ID获取用户 |
| GET | /users/username/:username | 根据用户名获取用户 |
| GET | /users/status/:status | 根据状态获取用户 |
| GET | /users/role/:role | 根据角色获取用户 |
| POST | /users | 创建新用户 |
| PATCH | /users/:id | 更新用户信息 |
| DELETE | /users/:id | 删除用户 |

### 产品管理

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /products | 获取所有产品 |
| GET | /products/:id | 根据ID获取产品 |
| GET | /products/search/:name | 根据名称搜索产品 |
| GET | /products/category/:category | 根据分类获取产品 |
| GET | /products/status/:status | 根据状态获取产品 |
| GET | /products/price-range | 根据价格范围获取产品 |
| GET | /products/low-stock/list | 获取低库存产品 |
| GET | /products/popular/list | 获取热门产品 |
| POST | /products | 创建新产品 |
| PATCH | /products/:id | 更新产品信息 |
| PATCH | /products/:id/increase-stock | 增加产品库存 |
| PATCH | /products/:id/decrease-stock | 减少产品库存 |
| DELETE | /products/:id | 删除产品 |

## 数据库设计

### 用户表 (users)
- _id: 用户唯一标识
- username: 用户名（唯一）
- email: 邮箱（唯一）
- password: 密码
- age: 年龄
- status: 状态（active/inactive）
- role: 角色（user/admin）

### 产品表 (products)
- _id: 产品唯一标识
- name: 产品名称
- description: 产品描述
- price: 价格
- stock: 库存数量
- category: 分类（electronics/clothing/food/books/other）
- imageUrl: 产品图片URL
- tags: 标签数组
- status: 状态（available/unavailable/discontinued）
- rating: 评分（0-5）
- salesCount: 销售数量

## 测试

使用 `test/api-test.http` 文件进行API测试，支持：
- VS Code REST Client扩展
- Postman
- ApiFox

### 测试示例

创建用户：
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "email": "test@example.com",
    "password": "password123",
    "age": 25,
    "status": "active",
    "role": "user"
  }'
```

获取所有用户：
```bash
curl http://localhost:3000/users
```

## Serverless部署

### AWS Lambda部署

1. 安装Serverless CLI
```bash
npm install -g serverless
```

2. 配置AWS凭证
```bash
serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY
```

3. 部署
```bash
npm run build
serverless deploy
```

### 腾讯云函数部署

1. 安装腾讯云Serverless CLI
```bash
npm install -g @serverless/tencent-sls
```

2. 配置腾讯云凭证
```bash
tcloud configure
```

3. 部署
```bash
npm run build
tcloud deploy
```

## 实验完成情况

**实验目的达成**：
1. 学习了基于NodeJS的现代Web开发模式
2. 使用NestJS和TypeScript搭建了数据库交互和API访问能力的后端服务
3. 准备了Serverless部署到云端的配置

**实验内容完成**：
1. NodeJS及NPM环境配置，使用NestJS CLI创建项目脚手架
2. 设计了用户和产品两个数据表，包含示例数据
3. 使用Mongoose实现了完整的CRUD操作
4. 设计了RESTful API的Controller，具备基本的Get和Post方法
5. 编写了API测试用例，支持Postman/ApiFox测试
6. 准备了Serverless部署配置，支持腾讯云和AWS

**实验要求满足**：
1. 实验在规定时间内完成
2. 使用VSCode搭建开发环境
3. 代码独立完成，注释量超过10%
4. 所有源代码文件完整
