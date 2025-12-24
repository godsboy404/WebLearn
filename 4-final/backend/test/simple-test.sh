#!/bin/bash

# 简单的API测试脚本
# 使用curl命令测试所有API端点

API_BASE_URL="http://localhost:3000/api"
REPORT_FILE="test-results.txt"

echo "开始API测试..." > $REPORT_FILE
echo "测试时间: $(date)" >> $REPORT_FILE
echo "=================================" >> $REPORT_FILE

# 测试函数
test_api() {
    local method=$1
    local url=$2
    local data=$3
    local description=$4
    
    echo "测试: $description" >> $REPORT_FILE
    echo "请求: $method $url" >> $REPORT_FILE
    
    if [ -n "$data" ]; then
        echo "数据: $data" >> $REPORT_FILE
        response=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X $method "$API_BASE_URL$url" \
            -H "Content-Type: application/json" \
            -d "$data")
    else
        response=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X $method "$API_BASE_URL$url")
    fi
    
    http_code=$(echo "$response" | grep -o 'HTTP_CODE:[0-9]*' | cut -d: -f2)
    body=$(echo "$response" | sed -e 's/HTTP_CODE:[0-9]*$//')
    
    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
        echo "结果: ✓ 成功 ($http_code)" >> $REPORT_FILE
    else
        echo "结果: ✗ 失败 ($http_code)" >> $REPORT_FILE
    fi
    
    echo "响应: $body" >> $REPORT_FILE
    echo "----------------------------------------" >> $REPORT_FILE
    echo "" >> $REPORT_FILE
    
    # 返回响应体供后续使用
    echo "$body"
}

# 1. 获取所有图书
echo "1. 获取所有图书列表" >> $REPORT_FILE
all_books=$(test_api "GET" "/books" "" "获取所有图书")

# 2. 创建新图书
echo "2. 创建新图书" >> $REPORT_FILE
create_response=$(test_api "POST" "/books" '{
  "title": "API测试图书",
  "author": "测试作者",
  "isbn": "978-7-111-11111-1",
  "publisher": "测试出版社",
  "publishDate": "2023-01-01",
  "category": "fiction",
  "tags": ["测试", "API"],
  "status": "unread",
  "rating": 3,
  "notes": "这是通过API测试创建的图书"
}' "创建新图书")

# 提取创建的图书ID (简单提取，可能需要根据实际响应调整)
book_id=$(echo "$create_response" | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)

if [ -n "$book_id" ]; then
    echo "创建的图书ID: $book_id" >> $REPORT_FILE
    
    # 3. 获取单本图书
    echo "3. 获取单本图书详情" >> $REPORT_FILE
    test_api "GET" "/books/$book_id" "" "获取单本图书"
    
    # 4. 更新图书
    echo "4. 更新图书信息" >> $REPORT_FILE
    test_api "PATCH" "/books/$book_id" '{
      "title": "更新后的图书标题",
      "rating": 5,
      "notes": "这是通过API测试更新的图书"
    }' "更新图书信息"
    
    # 5. 删除图书
    echo "5. 删除图书" >> $REPORT_FILE
    test_api "DELETE" "/books/$book_id" "" "删除图书"
else
    echo "无法获取图书ID，跳过后续测试" >> $REPORT_FILE
fi

# 6. 搜索图书
echo "6. 搜索图书" >> $REPORT_FILE
test_api "GET" "/books/search/JavaScript" "" "搜索图书"

# 7. 按分类获取图书
echo "7. 按分类获取图书" >> $REPORT_FILE
test_api "GET" "/books/category/fiction" "" "按分类获取图书"

# 8. 按状态获取图书
echo "8. 按状态获取图书" >> $REPORT_FILE
test_api "GET" "/books/status/read" "" "按阅读状态获取图书"

# 9. 按评分范围获取图书
echo "9. 按评分范围获取图书" >> $REPORT_FILE
test_api "GET" "/books/rating-range?minRating=3&maxRating=5" "" "按评分范围获取图书"

# 10. 获取统计信息
echo "10. 获取统计信息" >> $REPORT_FILE
test_api "GET" "/books/statistics/summary" "" "获取统计信息")

# 11. 测试错误情况
echo "11. 测试错误情况" >> $REPORT_FILE
test_api "GET" "/books/invalid-id" "" "测试获取不存在的图书"
test_api "POST" "/books" '{
  "author": "只有作者的图书"
}' "测试创建缺少必填字段的图书"
test_api "POST" "/books" '{
  "title": "测试图书",
  "author": "测试作者",
  "rating": 10
}' "测试创建评分超出范围的图书"

echo "测试完成!" >> $REPORT_FILE
echo "详细报告请查看: $REPORT_FILE"