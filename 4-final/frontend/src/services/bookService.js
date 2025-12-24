// 真实API服务，连接到后端NestJS API
import axios from 'axios'

// 配置axios基础URL
const API_BASE_URL = '/api'

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data
  },
  (error) => {
    // 对响应错误做点什么
    console.error('API请求错误:', error)
    const message = error.response?.data?.message || error.message || '请求失败'
    return Promise.reject(new Error(message))
  }
)

// API服务对象
export const bookService = {
  // 获取所有图书
  async getAllBooks() {
    try {
      return await apiClient.get('/books')
    } catch (error) {
      console.error('获取图书列表失败:', error)
      throw error
    }
  },
  
  // 根据ID获取单本图书
  async getBookById(id) {
    try {
      return await apiClient.get(`/books/${id}`)
    } catch (error) {
      console.error(`获取图书ID ${id} 失败:`, error)
      throw error
    }
  },
  
  // 添加新图书
  async addBook(bookData) {
    try {
      return await apiClient.post('/books', bookData)
    } catch (error) {
      console.error('添加图书失败:', error)
      throw error
    }
  },
  
  // 更新图书
  async updateBook(id, bookData) {
    try {
      return await apiClient.patch(`/books/${id}`, bookData)
    } catch (error) {
      console.error(`更新图书ID ${id} 失败:`, error)
      throw error
    }
  },
  
  // 删除图书
  async deleteBook(id) {
    try {
      return await apiClient.delete(`/books/${id}`)
    } catch (error) {
      console.error(`删除图书ID ${id} 失败:`, error)
      throw error
    }
  },
  
  // 搜索图书
  async searchBooks(query) {
    try {
      return await apiClient.get(`/books/search/${encodeURIComponent(query)}`)
    } catch (error) {
      console.error('搜索图书失败:', error)
      throw error
    }
  },

  // 根据分类获取图书
  async getBooksByCategory(category) {
    try {
      return await apiClient.get(`/books/category/${category}`)
    } catch (error) {
      console.error(`获取分类 ${category} 图书失败:`, error)
      throw error
    }
  },

  // 根据状态获取图书
  async getBooksByStatus(status) {
    try {
      return await apiClient.get(`/books/status/${status}`)
    } catch (error) {
      console.error(`获取状态 ${status} 图书失败:`, error)
      throw error
    }
  },

  // 获取统计信息
  async getStatistics() {
    try {
      return await apiClient.get('/books/statistics/summary')
    } catch (error) {
      console.error('获取统计信息失败:', error)
      throw error
    }
  }
}