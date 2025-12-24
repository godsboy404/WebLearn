<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
      <div class="p-6">
        <h2 class="text-xl font-bold mb-4 text-gray-800">
          {{ isEditing ? '编辑图书' : '添加新书' }}
        </h2>
        
        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- 书名 -->
            <div class="col-span-2 md:col-span-1">
              <label for="title" class="block text-sm font-medium text-gray-700 mb-1">书名 *</label>
              <input 
                id="title"
                v-model="formData.title" 
                type="text" 
                required 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <!-- 作者 -->
            <div class="col-span-2 md:col-span-1">
              <label for="author" class="block text-sm font-medium text-gray-700 mb-1">作者 *</label>
              <input 
                id="author"
                v-model="formData.author" 
                type="text" 
                required 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <!-- ISBN -->
            <div class="col-span-2 md:col-span-1">
              <label for="isbn" class="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
              <input 
                id="isbn"
                v-model="formData.isbn" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <!-- 出版社 -->
            <div class="col-span-2 md:col-span-1">
              <label for="publisher" class="block text-sm font-medium text-gray-700 mb-1">出版社</label>
              <input 
                id="publisher"
                v-model="formData.publisher" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <!-- 出版日期 -->
            <div class="col-span-2 md:col-span-1">
              <label for="publishDate" class="block text-sm font-medium text-gray-700 mb-1">出版日期</label>
              <input 
                id="publishDate"
                v-model="formData.publishDate" 
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <!-- 分类 -->
            <div class="col-span-2 md:col-span-1">
              <label for="category" class="block text-sm font-medium text-gray-700 mb-1">分类</label>
              <select 
                id="category"
                v-model="formData.category" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">请选择分类</option>
                <option value="fiction">小说</option>
                <option value="non-fiction">非小说</option>
                <option value="technical">技术</option>
                <option value="biography">传记</option>
              </select>
            </div>
            
            <!-- 阅读状态 -->
            <div class="col-span-2 md:col-span-1">
              <label for="status" class="block text-sm font-medium text-gray-700 mb-1">阅读状态</label>
              <select 
                id="status"
                v-model="formData.status" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="unread">未读</option>
                <option value="reading">在读</option>
                <option value="read">已读</option>
              </select>
            </div>
            
            <!-- 评分 -->
            <div class="col-span-2 md:col-span-1">
              <label for="rating" class="block text-sm font-medium text-gray-700 mb-1">评分</label>
              <select 
                id="rating"
                v-model="formData.rating" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="0">未评分</option>
                <option value="1">1星</option>
                <option value="2">2星</option>
                <option value="3">3星</option>
                <option value="4">4星</option>
                <option value="5">5星</option>
              </select>
            </div>
            
            <!-- 开始阅读日期 -->
            <div class="col-span-2 md:col-span-1">
              <label for="startDate" class="block text-sm font-medium text-gray-700 mb-1">开始阅读日期</label>
              <input 
                id="startDate"
                v-model="formData.startDate" 
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <!-- 完成阅读日期 -->
            <div class="col-span-2 md:col-span-1">
              <label for="finishDate" class="block text-sm font-medium text-gray-700 mb-1">完成阅读日期</label>
              <input 
                id="finishDate"
                v-model="formData.finishDate" 
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <!-- 封面图片URL -->
            <div class="col-span-2">
              <label for="coverImage" class="block text-sm font-medium text-gray-700 mb-1">封面图片URL</label>
              <input 
                id="coverImage"
                v-model="formData.coverImage" 
                type="url" 
                placeholder="https://example.com/book-cover.jpg"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <!-- 标签 -->
            <div class="col-span-2">
              <label for="tags" class="block text-sm font-medium text-gray-700 mb-1">标签（用逗号分隔）</label>
              <input 
                id="tags"
                v-model="tagsInput" 
                type="text" 
                placeholder="例如：JavaScript, 前端开发, 编程"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <!-- 个人笔记 -->
            <div class="col-span-2">
              <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">个人笔记</label>
              <textarea 
                id="notes"
                v-model="formData.notes" 
                rows="3" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
          
          <div class="flex justify-end gap-3 mt-6">
            <button 
              type="button" 
              @click="$emit('cancel')" 
              class="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              取消
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              {{ isEditing ? '更新' : '添加' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'BookForm',
  props: {
    book: {
      type: Object,
      default: null
    }
  },
  emits: ['save', 'cancel'],
  setup(props, { emit }) {
    const isEditing = computed(() => props.book !== null)
    
    // 表单数据
    const formData = ref({
      title: '',
      author: '',
      isbn: '',
      publisher: '',
      publishDate: '',
      category: '',
      status: 'unread',
      rating: 0,
      notes: '',
      startDate: '',
      finishDate: '',
      coverImage: ''
    })
    
    // 标签输入（字符串格式）
    const tagsInput = ref('')
    
    // 监听props.book变化，更新表单数据
    watch(() => props.book, (newBook) => {
      if (newBook) {
        formData.value = { ...newBook }
        tagsInput.value = newBook.tags ? newBook.tags.join(', ') : ''
      } else {
        // 重置表单
        formData.value = {
          title: '',
          author: '',
          isbn: '',
          publisher: '',
          publishDate: '',
          category: '',
          status: 'unread',
          rating: 0,
          notes: '',
          startDate: '',
          finishDate: '',
          coverImage: ''
        }
        tagsInput.value = ''
      }
    }, { immediate: true }) // 添加 immediate: true 确保初始时也执行
    
    // 提交表单
    const handleSubmit = () => {
      // 处理标签
      const tags = tagsInput.value
        ? tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag)
        : []
      
      // 准备提交的数据
      const bookData = {
        ...formData.value,
        tags
      }
      
      emit('save', bookData)
    }
    
    return {
      formData,
      tagsInput,
      isEditing,
      handleSubmit
    }
  }
}
</script>