# 个人图书管理系统

## 功能特点

- 图书信息管理（添加、编辑、删除、查看）
- 阅读状态跟踪（未读/在读/已读）
- 个人评分系统（1-5星）
- 标签分类管理
- 搜索和筛选功能

## 技术栈

- **前端框架**: Vue.js 3
- **样式框架**: Tailwind CSS
- **构建工具**: Vite
- **语言**: JavaScript
- **数据存储**: 本地模拟数据

## 项目结构

```
book-management/
├── index.html              # 主页面
├── package.json            # 项目配置
├── vite.config.js          # Vite配置
├── README.md               # 项目说明
└── src/
    ├── main.js             # 应用入口
    ├── App.vue             # 根组件
    ├── components/         # 组件目录
    │   ├── BookCard.vue    # 图书卡片组件
    │   ├── BookForm.vue    # 图书表单组件
    │   └── BookDetail.vue  # 图书详情组件
    ├── services/           # API服务
    │   └── bookService.js  # 图书相关API
    └── styles/             # 样式文件
        └── main.css        # 主样式文件
```

## Quick Starting

### 一：查看前端

1. 直接打开 `index.html` 文件在浏览器中查看

### 二：完整运行（前+后端）

#### 步骤1：启动后端API服务器

1. 进入后端项目目录：
   ```bash
   cd ../3-NodeJS
   ```

2. 安装后端依赖：
   ```bash
   npm install
   ```

3. 启动后端服务器：
   ```bash
   npm run start:dev
   ```

   后端API将在 `http://localhost:3000` 运行

#### 步骤2：启动前端开发服务器

1. 进入前端项目目录：
   ```bash
   cd ../4-final/book-management
   ```

2. 使用启动脚本（推荐）：
   - Linux/Mac用户：运行 `./start.sh`
   - Windows用户：运行 `start.bat`

   或者手动执行：
   ```bash
   npm install
   npm run dev
   ```

3. 在浏览器中打开 `http://localhost:5173`

### 方法三：仅前端开发服务器

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 在浏览器中打开 `http://localhost:5173`

### 方法四：构建生产版本

1. 构建项目：
   ```bash
   npm run build
   ```

2. 预览构建结果：
   ```bash
   npm run preview
   ```

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
2. 使用状态筛选器按阅读状态筛选
3. 使用分类筛选器按图书分类筛选

## 数据模型

每本图书包含以下信息：

- **基本信息**: 书名、作者、ISBN、出版社、出版日期
- **分类信息**: 分类、标签
- **阅读信息**: 阅读状态、评分、开始/完成阅读日期
- **个人记录**: 个人笔记
- **系统信息**: 创建/更新时间、封面图片

## 扩展计划

- [ ] 连接真实后端API
- [ ] 用户登录和权限管理
- [ ] 图书封面上传功能
- [ ] 阅读统计和报告
- [ ] 图书推荐功能
- [ ] 数据导入/导出功能

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 许可证

MIT License