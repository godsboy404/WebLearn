# API测试工具使用说明

## 文件说明

本目录包含完整的API测试工具集：

1. **generate-test-report.js** - 核心测试脚本，执行所有API测试并生成HTML报告（使用Node.js内置http模块）
2. **axios-test.js** - 使用axios的测试脚本，生成HTML报告（推荐）
3. **api-test.http** - VS Code REST Client测试文件，可手动执行单个API测试
4. **simple-test.sh** - 简单的bash脚本，使用curl命令测试API

## 快速开始

### 法一：npm脚本

1. Node.JS:
```bash
# ttys0
cd backend
npm run start:dev
# ttys1
cd backend
npm run test:api
```
2. axios:
```bash
cd backend
npm run test:axios
```
3. bash:
```bash
cd backend/test
./simple-test.sh
```
4. 测试完成后自动打开报告

### 法二：VS Code REST Client

点击`api-test.http`文件每个请求上方的"Send Request"链接。

## 测试报告

测试完成后会生成`api-test-report.html`文件，包含：

- **测试概览**：总测试数、通过数、失败数、成功率
- **可视化图表**：测试结果分布图
- **详细结果**：每个API测试的详细信息，包括：
  - 请求方法和URL
  - 状态码和响应时间
  - 请求数据
  - 响应数据
  - 错误信息（如果有）

## 测试覆盖范围

自动化测试覆盖以下API端点：

1. **基础CRUD操作**
   - GET /api/books - 获取所有图书
   - POST /api/books - 创建新图书
   - GET /api/books/:id - 获取单本图书
   - PATCH /api/books/:id - 更新图书
   - DELETE /api/books/:id - 删除图书

2. **搜索和筛选功能**
   - GET /api/books/search/:query - 搜索图书
   - GET /api/books/category/:category - 按分类获取
   - GET /api/books/status/:status - 按状态获取
   - GET /api/books/rating-range - 按评分范围获取

3. **统计功能**
   - GET /api/books/statistics/summary - 获取统计信息

4. **错误处理测试**
   - 获取不存在的图书ID
   - 创建缺少必填字段的图书
   - 创建评分超出范围的图书
