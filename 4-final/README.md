# 个人图书管理系统

一个基于 Vue.js 3 和 NestJS 的全栈个人图书管理系统，实现了图书信息的增删改查、阅读状态跟踪、个人评分和搜索筛选等功能。

## 项目结构

```
4-final/
├── backend/                 # NestJS 后端 API
│   ├── src/
│   │   ├── modules/book/    # 图书模块
│   │   └── ...
│   ├── start.sh            # Linux/Mac 启动脚本
│   ├── start.bat           # Windows 启动脚本
│   └── package.json
├── frontend/               # Vue.js 前端应用
│   ├── src/
│   │   ├── components/     # Vue 组件
│   │   └── ...
│   ├── start.sh            # Linux/Mac 启动脚本
│   ├── start.bat           # Windows 启动脚本
│   └── package.json
└── README.md              # 项目说明文档
```

## 技术栈

### 前端
- **框架**: Vue.js 3
- **样式**: Tailwind CSS
- **构建工具**: Vite
- **HTTP 客户端**: Axios
- **语言**: JavaScript

### 后端
- **框架**: NestJS
- **数据库**: MongoDB
- **语言**: TypeScript
- **API 文档**: Swagger

## 功能特点

- 图书信息管理（添加、编辑、删除、查看）
- 阅读状态跟踪（未读/在读/已读）
- 个人评分系统（1-5星）
- 标签分类管理
- 搜索和筛选功能

## 快速开始

### 环境要求

- Node.js (版本 16 或更高)
- npm 或 yarn
- MongoDB

### 启动MongoDB

```bash
brew services start mongodb-community
```

### 启动后端服务

1. 进入后端目录：
   ```bash
   cd backend
   ```

2. 使用启动脚本：
   - Linux/Mac用户：运行 `./start.sh`
   - Windows用户：运行 `start.bat`

   或者手动执行：
   ```bash
   npm install
   npm run start:dev
   ```

3. 后端API将在 `http://localhost:3000` 运行
   - API文档：`http://localhost:3000/api-docs`


### 启动前端服务

1. 进入前端目录：
   ```bash
   cd frontend
   ```

2. 使用启动脚本（推荐）：
   - Linux/Mac用户：运行 `./start.sh`
   - Windows用户：运行 `start.bat`

   或者手动执行：
   ```bash
   npm install
   npm run dev
   ```

3. 前端应用将在 `http://localhost:5173` 运行

### 访问应用

在浏览器中打开 `http://localhost:5173` 即可使用个人图书管理系统。

## 使用说明

### 添加图书

1. 点击页面右上角的"添加新书"按钮
2. 填写图书信息（书名和作者为必填项）
3. 点击"添加"按钮保存

### 编辑图书

1. 在图书卡片上点击"编辑"按钮
2. 修改图书信息
3. 点击"更新"按钮保存更改

### 查看图书详情

1. 在图书卡片上点击"查看详情"按钮
2. 在弹出的详情窗口中查看完整信息

### 删除图书

1. 在图书卡片上点击"删除"按钮
2. 确认删除操作

### 搜索和筛选

1. 在搜索框中输入关键词搜索书名或作者
2. 使用筛选器按阅读状态、分类和评分筛选

## API 接口

### 图书管理

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /books | 获取所有图书 |
| GET | /books/:id | 获取单本图书 |
| POST | /books | 添加新图书 |
| PATCH | /books/:id | 更新图书信息 |
| DELETE | /books/:id | 删除图书 |
| GET | /books/search/:query | 搜索图书 |

### 其他接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /books/category/:category | 按分类获取图书 |
| GET | /books/status/:status | 按阅读状态获取图书 |
| GET | /books/rating-range | 按评分范围获取图书 |
| GET | /books/statistics/summary | 获取统计信息 |

## 开发说明

### 项目设计原则

1. **简单易用**: 界面简洁直观，操作流程清晰
2. **响应式设计**: 适配不同屏幕尺寸的设备
3. **错误处理**: 友好的错误提示和恢复机制
4. **性能优化**: 合理的数据加载和状态管理


## 扩展计划（如果有兴趣和时间）

- [ ] 用户登录和权限管理
- [ ] 图书封面上传功能
- [ ] 阅读统计和报告
- [ ] 图书推荐功能
- [ ] 数据导入/导出功能
- [ ] 移动端应用


## 许可证

GUGUGAGA License ver.0721