<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-blue-600 text-white shadow-md">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">个人图书管理系统</h1>
          <button
            @click="showAddBookForm = true"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            添加新书
          </button>
        </div>
      </div>
    </header>
    
    <main class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">我的图书收藏</h2>
      </div>
      
      <!-- 搜索栏 -->
      <search-bar @search="handleSearch"></search-bar>
      
      <!-- 筛选栏 -->
      <filter-bar @filter="handleFilter"></filter-bar>
      
      <!-- 图书列表 -->
      <book-list
        :books="filteredBooks"
        @edit="editBook"
        @delete="deleteBook"
        @view="viewBookDetails"
      ></book-list>
    </main>
    
    <!-- 添加/编辑图书模态框 -->
    <book-form
      v-if="showAddBookForm || editingBook"
      :book="editingBook"
      @save="saveBook"
      @cancel="cancelForm"
    ></book-form>
    
    <!-- 图书详情模态框 -->
    <book-detail
      v-if="viewingBook"
      :book="viewingBook"
      @close="viewingBook = null"
      @edit="editBook"
      @delete="deleteBook"
    ></book-detail>
    
    <!-- 错误提示模态框 -->
    <error-modal
      :show="showError"
      :message="errorMessage"
      @close="showError = false"
    ></error-modal>
    
    <!-- 加载指示器 -->
    <loading-spinner
      :show="isLoading"
      :message="loadingMessage"
    ></loading-spinner>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import BookList from './components/BookList.vue'
import BookForm from './components/BookForm.vue'
import BookDetail from './components/BookDetail.vue'
import SearchBar from './components/SearchBar.vue'
import FilterBar from './components/FilterBar.vue'
import ErrorModal from './components/ErrorModal.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import { bookService } from './services/bookService.js'

export default {
  name: 'App',
  components: {
    BookList,
    BookForm,
    BookDetail,
    SearchBar,
    FilterBar,
    ErrorModal,
    LoadingSpinner
  },
  setup() {
    const books = ref([])
    const searchQuery = ref('')
    const filterStatus = ref('')
    const filterCategory = ref('')
    const filterRating = ref('')
    const showAddBookForm = ref(false)
    const editingBook = ref(null)
    const viewingBook = ref(null)
    const showError = ref(false)
    const errorMessage = ref('')
    const isLoading = ref(false)
    const loadingMessage = ref('')
    
    // 计算属性：过滤后的图书列表
    const filteredBooks = computed(() => {
      return books.value.filter(book => {
        const matchesSearch = !searchQuery.value ||
          (book.title && book.title.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
          (book.author && book.author.toLowerCase().includes(searchQuery.value.toLowerCase()))
        
        const matchesStatus = !filterStatus.value || book.status === filterStatus.value
        const matchesCategory = !filterCategory.value || book.category === filterCategory.value
        const matchesRating = !filterRating.value || book.rating >= parseInt(filterRating.value)
        
        return matchesSearch && matchesStatus && matchesCategory && matchesRating
      })
    })
    
    // 处理搜索
    const handleSearch = (query) => {
      searchQuery.value = query
    }
    
    // 处理筛选
    const handleFilter = (filters) => {
      filterStatus.value = filters.status || ''
      filterCategory.value = filters.category || ''
      filterRating.value = filters.rating || ''
    }
    
    // 显示错误信息
    const showErrorModal = (message) => {
      errorMessage.value = message
      showError.value = true
    }
    
    // 显示加载指示器
    const showLoading = (message = '') => {
      loadingMessage.value = message
      isLoading.value = true
    }
    
    // 隐藏加载指示器
    const hideLoading = () => {
      isLoading.value = false
    }
    
    // 获取图书列表
    const fetchBooks = async () => {
      try {
        showLoading('正在加载图书列表...')
        books.value = await bookService.getAllBooks()
      } catch (error) {
        console.error('获取图书列表失败:', error)
        showErrorModal('获取图书列表失败，已加载示例数据。请检查网络连接或稍后重试')
        // 如果API失败，使用模拟数据
        books.value = [
          {
            id: 1,
            title: 'JavaScript高级程序设计',
            author: 'Nicholas C. Zakas',
            isbn: '978-7-115-27579-0',
            publisher: '人民邮电出版社',
            publishDate: '2012-03-01',
            category: 'technical',
            tags: ['JavaScript', '前端开发'],
            status: 'read',
            rating: 5,
            notes: '非常经典的JavaScript入门书籍，内容全面详实。',
            startDate: '2022-01-15',
            finishDate: '2022-03-20',
            coverImage: 'https://picsum.photos/seed/js-book/200/300.jpg',
            createdAt: '2022-01-15T10:00:00Z',
            updatedAt: '2022-03-20T15:30:00Z'
          },
          {
            id: 2,
            title: '人类简史',
            author: '尤瓦尔·赫拉利',
            isbn: '978-7-5086-4735-7',
            publisher: '中信出版社',
            publishDate: '2014-11-01',
            category: 'non-fiction',
            tags: ['历史', '人类学'],
            status: 'reading',
            rating: 4,
            notes: '从认知革命、农业革命到科学革命，重新理解人类历史。',
            startDate: '2022-11-01',
            finishDate: null,
            coverImage: 'https://picsum.photos/seed/sapiens/200/300.jpg',
            createdAt: '2022-11-01T09:00:00Z',
            updatedAt: '2022-11-01T09:00:00Z'
          },
          {
            id: 3,
            title: '三体',
            author: '刘慈欣',
            isbn: '978-7-5366-9293-0',
            publisher: '重庆出版社',
            publishDate: '2008-01-01',
            category: 'fiction',
            tags: ['科幻', '小说'],
            status: 'unread',
            rating: 0,
            notes: '',
            startDate: null,
            finishDate: null,
            coverImage: 'https://picsum.photos/seed/three-body/200/300.jpg',
            createdAt: '2022-12-01T14:20:00Z',
            updatedAt: '2022-12-01T14:20:00Z'
          }
        ]
      } finally {
        hideLoading()
      }
    }
    
    // 编辑图书
    const editBook = (book) => {
      editingBook.value = { ...book }
    }
    
    // 删除图书
    const deleteBook = async (bookId) => {
      if (confirm('确定要删除这本书吗？')) {
        try {
          showLoading('正在删除图书...')
          await bookService.deleteBook(bookId)
          books.value = books.value.filter(book => book.id !== bookId)
        } catch (error) {
          console.error('删除图书失败:', error)
          showErrorModal('删除图书失败，请重试')
        } finally {
          hideLoading()
        }
      }
    }
    
    // 查看图书详情
    const viewBookDetails = (book) => {
      viewingBook.value = book
    }
    
    // 保存图书
    const saveBook = async (bookData) => {
      try {
        showLoading(editingBook.value ? '正在更新图书信息...' : '正在添加新书...')
        if (editingBook.value) {
          // 更新现有图书
          const updatedBook = await bookService.updateBook(editingBook.value.id, bookData)
          const index = books.value.findIndex(book => book.id === editingBook.value.id)
          books.value[index] = updatedBook
        } else {
          // 添加新图书
          const newBook = await bookService.addBook(bookData)
          books.value.push(newBook)
        }
        cancelForm()
      } catch (error) {
        console.error('保存图书失败:', error)
        showErrorModal('保存图书失败，请检查输入信息并重试')
      } finally {
        hideLoading()
      }
    }
    
    // 取消表单
    const cancelForm = () => {
      showAddBookForm.value = false
      editingBook.value = null
    }
    
    // 组件挂载时获取图书列表
    onMounted(() => {
      fetchBooks()
    })
    
    return {
      books,
      searchQuery,
      filterStatus,
      filterCategory,
      filterRating,
      showAddBookForm,
      editingBook,
      viewingBook,
      showError,
      errorMessage,
      isLoading,
      loadingMessage,
      filteredBooks,
      handleSearch,
      handleFilter,
      showErrorModal,
      showLoading,
      hideLoading,
      editBook,
      deleteBook,
      viewBookDetails,
      saveBook,
      cancelForm
    }
  }
}
</script>