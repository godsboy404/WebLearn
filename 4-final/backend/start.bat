@echo off
echo 正在启动个人图书管理系统后端...

REM 检查是否安装了依赖
if not exist "node_modules" (
    echo 正在安装依赖...
    npm install
)

REM 启动开发服务器
echo 启动开发服务器...
npm run start:dev