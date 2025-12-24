#!/bin/bash

echo "正在启动个人图书管理系统前端..."

# 检查是否安装了依赖
if [ ! -d "node_modules" ]; then
    echo "正在安装依赖..."
    npm install
fi

# 启动开发服务器
echo "启动开发服务器..."
npm run dev