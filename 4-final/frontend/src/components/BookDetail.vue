<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-screen overflow-y-auto">
      <div class="relative">
        <!-- 关闭按钮 -->
        <button 
          @click="$emit('close')" 
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full p-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div class="md:flex">
          <!-- 图书封面 -->
          <div class="md:w-1/3 bg-gray-200 p-4">
            <img 
              :src="book.coverImage || 'https://picsum.photos/seed/default-book/200/300.jpg'" 
              :alt="book.title" 
              class="w-full h-auto rounded-lg shadow-md"
            >
          </div>
          
          <!-- 图书信息 -->
          <div class="md:w-2/3 p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ book.title }}</h2>
            <p class="text-lg text-gray-600 mb-4">作者：{{ book.author }}</p>
            
            <!-- 基本信息 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div v-if="book.isbn" class="mb-2">
                <span class="text-sm font-medium text-gray-500">ISBN：</span>
                <span class="text-sm text-gray-700">{{ book.isbn }}</span>
              </div>
              <div v-if="book.publisher" class="mb-2">
                <span class="text-sm font-medium text-gray-500">出版社：</span>
                <span class="text-sm text-gray-700">{{ book.publisher }}</span>
              </div>
              <div v-if="book.publishDate" class="mb-2">
                <span class="text-sm font-medium text-gray-500">出版日期：</span>
                <span class="text-sm text-gray-700">{{ formatDate(book.publishDate) }}</span>
              </div>
              <div v-if="book.category" class="mb-2">
                <span class="text-sm font-medium text-gray-500">分类：</span>
                <span class="text-sm text-gray-700">{{ getCategoryText(book.category) }}</span>
              </div>
            </div>
            
            <!-- 阅读状态和评分 -->
            <div class="flex items-center mb-6">
              <div class="mr-6">
                <span class="text-sm font-medium text-gray-500">阅读状态：</span>
                <span :class="statusClass" class="px-2 py-1 text-xs rounded-full text-white ml-1">
                  {{ statusText }}
                </span>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">评分：</span>
                <span class="text-yellow-400 ml-1">
                  {{ getRatingStars(book.rating || 0) }}
                </span>
                <span v-if="book.rating && book.rating > 0" class="text-sm text-gray-600 ml-1">({{ book.rating }}/5)</span>
              </div>
            </div>
            
            <!-- 阅读日期 -->
            <div v-if="book.startDate || book.finishDate" class="mb-6">
              <div v-if="book.startDate" class="mb-2">
                <span class="text-sm font-medium text-gray-500">开始阅读：</span>
                <span class="text-sm text-gray-700">{{ formatDate(book.startDate) }}</span>
              </div>
              <div v-if="book.finishDate">
                <span class="text-sm font-medium text-gray-500">完成阅读：</span>
                <span class="text-sm text-gray-700">{{ formatDate(book.finishDate) }}</span>
              </div>
            </div>
            
            <!-- 标签 -->
            <div v-if="book.tags && book.tags.length > 0" class="mb-6">
              <span class="text-sm font-medium text-gray-500">标签：</span>
              <div class="flex flex-wrap gap-1 mt-1">
                <span 
                  v-for="tag in book.tags" 
                  :key="tag" 
                  class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            
            <!-- 个人笔记 -->
            <div v-if="book.notes" class="mb-6">
              <h3 class="text-sm font-medium text-gray-500 mb-2">个人笔记：</h3>
              <p class="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{{ book.notes }}</p>
            </div>
            
            <!-- 操作按钮 -->
            <div class="flex gap-3">
              <button 
                @click="$emit('edit', book)" 
                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              >
                编辑
              </button>
              <button 
                @click="$emit('delete', book.id)" 
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookDetail',
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'edit', 'delete'],
  computed: {
    statusClass() {
      switch (this.book.status) {
        case 'read':
          return 'bg-green-500'
        case 'reading':
          return 'bg-yellow-500'
        case 'unread':
        default:
          return 'bg-gray-500'
      }
    },
    statusText() {
      switch (this.book.status) {
        case 'read':
          return '已读'
        case 'reading':
          return '在读'
        case 'unread':
        default:
          return '未读'
      }
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    getCategoryText(category) {
      switch (category) {
        case 'fiction':
          return '小说'
        case 'non-fiction':
          return '非小说'
        case 'technical':
          return '技术'
        case 'biography':
          return '传记'
        default:
          return category
      }
    },
    getRatingStars(rating) {
      let stars = ''
      for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '★' : '☆'
      }
      return stars
    }
  }
}
</script>