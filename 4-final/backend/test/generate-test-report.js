#!/usr/bin/env node

/**
 * API测试报告生成器
 * 自动执行API测试并生成详细报告
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// 配置
const API_BASE_URL = 'http://localhost:3000/api';
const REPORT_FILE = path.join(__dirname, 'api-test-report.html');

// 测试结果存储
const testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  errors: [],
  details: []
};

// 颜色和样式
const HTML_STYLES = `
<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
  }
  .header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .summary {
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
  .summary-item {
    background: white;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    min-width: 150px;
    margin: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .success {
    border-left: 4px solid #28a745;
  }
  .error {
    border-left: 4px solid #dc3545;
  }
  .info {
    border-left: 4px solid #17a2b8;
  }
  .test-case {
    background: white;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .test-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  .test-title {
    font-size: 18px;
    font-weight: bold;
  }
  .test-status {
    padding: 5px 10px;
    border-radius: 4px;
    color: white;
    font-size: 14px;
  }
  .status-pass {
    background-color: #28a745;
  }
  .status-fail {
    background-color: #dc3545;
  }
  .status-info {
    background-color: #17a2b8;
  }
  .test-details {
    margin-top: 15px;
  }
  .request, .response {
    margin-bottom: 15px;
  }
  .code-block {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 15px;
    font-family: 'Courier New', Courier, monospace;
    white-space: pre-wrap;
    overflow-x: auto;
    font-size: 14px;
  }
  .error-message {
    color: #dc3545;
    background-color: #f8d7da;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
  }
  .footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    color: #666;
    font-size: 14px;
  }
  .chart-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
`;

// 工具函数
function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] [${type.toUpperCase()}] ${message}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// API测试函数
async function testAPI(method, url, data = null, description = '') {
  testResults.total++;
  const startTime = Date.now();
  
  return new Promise((resolve) => {
    const urlObj = new URL(`${API_BASE_URL}${url}`);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    if (data) {
      const jsonData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(jsonData);
    }
    
    log(`Testing: ${method} ${url}`);
    
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        try {
          const parsedData = JSON.parse(responseData);
          
          if (res.statusCode >= 200 && res.statusCode < 300) {
            testResults.passed++;
            
            const result = {
              method,
              url,
              description,
              status: 'PASS',
              statusCode: res.statusCode,
              duration,
              request: data ? JSON.stringify(data, null, 2) : 'None',
              response: responseData
            };
            
            testResults.details.push(result);
            log(`✓ ${method} ${url} - ${res.statusCode} (${duration}ms)`);
            resolve({ success: true, data: parsedData, id: parsedData._id || parsedData.id });
          } else {
            testResults.failed++;
            testResults.errors.push(`HTTP ${res.statusCode}`);
            
            const result = {
              method,
              url,
              description,
              status: 'FAIL',
              statusCode: res.statusCode,
              duration,
              request: data ? JSON.stringify(data, null, 2) : 'None',
              response: responseData,
              error: `HTTP ${res.statusCode}`
            };
            
            testResults.details.push(result);
            log(`✗ ${method} ${url} - HTTP ${res.statusCode} (${duration}ms)`, 'error');
            resolve({ success: false, error: `HTTP ${res.statusCode}` });
          }
        } catch (parseError) {
          testResults.failed++;
          testResults.errors.push(`JSON解析错误: ${parseError.message}`);
          
          const result = {
            method,
            url,
            description,
            status: 'FAIL',
            statusCode: res.statusCode,
            duration,
            request: data ? JSON.stringify(data, null, 2) : 'None',
            response: responseData,
            error: `JSON解析错误: ${parseError.message}`
          };
          
          testResults.details.push(result);
          log(`✗ ${method} ${url} - JSON解析错误 (${duration}ms)`, 'error');
          resolve({ success: false, error: `JSON解析错误: ${parseError.message}` });
        }
      });
    });
    
    req.on('error', (error) => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      testResults.failed++;
      testResults.errors.push(error.message);
      
      const result = {
        method,
        url,
        description,
        status: 'FAIL',
        statusCode: 'N/A',
        duration,
        request: data ? JSON.stringify(data, null, 2) : 'None',
        response: error.message,
        error: error.message
      };
      
      testResults.details.push(result);
      log(`✗ ${method} ${url} - ${error.message} (${duration}ms)`, 'error');
      resolve({ success: false, error: error.message });
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// 生成HTML报告
function generateReport() {
  const successRate = testResults.total > 0 ? ((testResults.passed / testResults.total) * 100).toFixed(1) : 0;
  
  const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>图书管理系统API测试报告</title>
  ${HTML_STYLES}
</head>
<body>
  <div class="header">
    <h1>图书管理系统API测试报告</h1>
    <p>生成时间: ${new Date().toLocaleString()}</p>
  </div>
  
  <div class="summary">
    <div class="summary-item">
      <h3>总测试数</h3>
      <p style="font-size: 24px; font-weight: bold;">${testResults.total}</p>
    </div>
    <div class="summary-item">
      <h3>通过数</h3>
      <p style="font-size: 24px; font-weight: bold; color: #28a745;">${testResults.passed}</p>
    </div>
    <div class="summary-item">
      <h3>失败数</h3>
      <p style="font-size: 24px; font-weight: bold; color: #dc3545;">${testResults.failed}</p>
    </div>
    <div class="summary-item">
      <h3>成功率</h3>
      <p style="font-size: 24px; font-weight: bold;">${successRate}%</p>
    </div>
  </div>
  
  <div class="chart-container">
    <h2>测试结果分布</h2>
    <div style="display: flex; height: 200px; align-items: flex-end;">
      <div style="background-color: #28a745; width: ${successRate}%; height: 100%; border-radius: 4px 0 0 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
        ${successRate}%
      </div>
      <div style="background-color: #dc3545; width: ${100 - successRate}%; height: 100%; border-radius: 0 4px 4px 0; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
        ${100 - successRate}%
      </div>
    </div>
  </div>
  
  <h2>详细测试结果</h2>
  ${testResults.details.map(detail => `
    <div class="test-case ${detail.status === 'PASS' ? 'success' : 'error'}">
      <div class="test-header">
        <div class="test-title">${detail.description || `${detail.method} ${detail.url}`}</div>
        <div class="test-status status-${detail.status.toLowerCase()}">${detail.status}</div>
      </div>
      <div class="test-details">
        <p><strong>方法:</strong> ${detail.method} | <strong>URL:</strong> ${detail.url}</p>
        <p><strong>状态码:</strong> ${detail.statusCode} | <strong>耗时:</strong> ${detail.duration}ms</p>
        
        <div class="request">
          <h4>请求数据:</h4>
          <div class="code-block">${detail.request}</div>
        </div>
        
        <div class="response">
          <h4>响应数据:</h4>
          <div class="code-block">${detail.response}</div>
        </div>
        
        ${detail.error ? `<div class="error-message"><strong>错误信息:</strong> ${detail.error}</div>` : ''}
      </div>
    </div>
  `).join('')}
  
  <div class="footer">
    <p>报告由图书管理系统API测试工具自动生成</p>
  </div>
</body>
</html>`;

  fs.writeFileSync(REPORT_FILE, html, 'utf8');
  log(`测试报告已生成: ${REPORT_FILE}`);
}

// 主测试函数
async function runTests() {
  log('开始API测试...');
  log('请确保后端服务在 http://localhost:3000 运行');
  
  try {
    // 等待一下确保服务启动
    await sleep(1000);
    
    // 1. 获取所有图书
    await testAPI('GET', '/books', null, '获取所有图书列表');
    
    // 2. 创建新图书
    const createResult = await testAPI('POST', '/books', {
      title: 'API测试图书',
      author: '测试作者',
      isbn: '978-7-111-11111-1',
      publisher: '测试出版社',
      publishDate: '2023-01-01',
      category: 'fiction',
      tags: ['测试', 'API'],
      status: 'unread',
      rating: 3,
      notes: '这是通过API测试创建的图书'
    }, '创建新图书');
    
    if (createResult.success && createResult.data._id) {
      const bookId = createResult.data._id;
      
      // 3. 获取单本图书
      await testAPI('GET', `/books/${bookId}`, null, '获取单本图书详情');
      
      // 4. 更新图书
      await testAPI('PATCH', `/books/${bookId}`, {
        title: '更新后的图书标题',
        rating: 5,
        notes: '这是通过API测试更新的图书'
      }, '更新图书信息');
      
      // 5. 删除图书
      await testAPI('DELETE', `/books/${bookId}`, null, '删除图书');
    }
    
    // 6. 搜索图书
    await testAPI('GET', '/books/search/JavaScript', null, '搜索图书');
    
    // 7. 按分类获取图书
    await testAPI('GET', '/books/category/fiction', null, '按分类获取图书');
    
    // 8. 按状态获取图书
    await testAPI('GET', '/books/status/read', null, '按阅读状态获取图书');
    
    // 9. 按评分范围获取图书
    await testAPI('GET', '/books/rating-range?minRating=3&maxRating=5', null, '按评分范围获取图书');
    
    // 10. 获取统计信息
    await testAPI('GET', '/books/statistics/summary', null, '获取统计信息');
    
    // 11. 测试错误情况
    await testAPI('GET', '/books/invalid-id', null, '测试获取不存在的图书');
    
    await testAPI('POST', '/books', {
      // 故意不提供必填字段
      author: '只有作者的图书'
    }, '测试创建缺少必填字段的图书');
    
    await testAPI('POST', '/books', {
      title: '测试图书',
      author: '测试作者',
      rating: 10 // 超出范围的评分
    }, '测试创建评分超出范围的图书');
    
  } catch (error) {
    log(`测试过程中发生错误: ${error.message}`, 'error');
  }
  
  // 生成报告
  generateReport();
  
  log(`测试完成! 总计: ${testResults.total}, 通过: ${testResults.passed}, 失败: ${testResults.failed}`);
  log(`详细报告请查看: ${REPORT_FILE}`);
}

// 执行测试
if (require.main === module) {
  runTests().catch(error => {
    log(`测试执行失败: ${error.message}`, 'error');
    process.exit(1);
  });
}

module.exports = { testAPI, generateReport };