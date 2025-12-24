@echo off
chcp 65001 >nul
echo ==========================================
echo 图书管理系统 API 测试工具
echo ==========================================

REM 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未找到Node.js，请先安装Node.js
    pause
    exit /b 1
)

REM 检查后端服务是否运行
echo 检查后端服务状态...
curl -s http://localhost:3000/api/books >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ 后端服务正在运行
) else (
    echo ✗ 后端服务未运行，请先启动后端服务
    echo   运行命令: cd backend && npm run start:dev
    pause
    exit /b 1
)

REM 检查是否安装了axios
if not exist "node_modules\axios" (
    echo 安装测试依赖...
    npm install axios
)

REM 执行测试
echo 开始执行API测试...
node generate-test-report.js

REM 检查报告是否生成
if exist "api-test-report.html" (
    echo ==========================================
    echo ✓ 测试完成! 报告已生成
    echo 报告文件: %cd%\api-test-report.html
    
    REM 在默认浏览器中打开报告
    start api-test-report.html
) else (
    echo ✗ 报告生成失败
    pause
    exit /b 1
)

pause