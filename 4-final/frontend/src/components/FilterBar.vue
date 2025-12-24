<template>
  <div class="bg-white p-4 rounded-lg shadow mb-6">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">阅读状态</label>
        <select 
          v-model="filterStatus" 
          @change="$emit('filter', { status: filterStatus, category: filterCategory })"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">所有状态</option>
          <option value="unread">未读</option>
          <option value="reading">在读</option>
          <option value="read">已读</option>
        </select>
      </div>
      
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">图书分类</label>
        <select 
          v-model="filterCategory" 
          @change="$emit('filter', { status: filterStatus, category: filterCategory })"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">所有分类</option>
          <option value="fiction">小说</option>
          <option value="non-fiction">非小说</option>
          <option value="technical">技术</option>
          <option value="biography">传记</option>
        </select>
      </div>
      
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">评分</label>
        <select 
          v-model="filterRating" 
          @change="$emit('filter', { status: filterStatus, category: filterCategory, rating: filterRating })"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">所有评分</option>
          <option value="5">5星</option>
          <option value="4">4星及以上</option>
          <option value="3">3星及以上</option>
          <option value="2">2星及以上</option>
          <option value="1">1星及以上</option>
        </select>
      </div>
      
      <div class="flex items-end">
        <button 
          @click="resetFilters"
          class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
        >
          重置筛选
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'FilterBar',
  emits: ['filter'],
  setup(props, { emit }) {
    const filterStatus = ref('')
    const filterCategory = ref('')
    const filterRating = ref('')
    
    const resetFilters = () => {
      filterStatus.value = ''
      filterCategory.value = ''
      filterRating.value = ''
      emit('filter', { status: '', category: '', rating: '' })
    }
    
    return {
      filterStatus,
      filterCategory,
      filterRating,
      resetFilters
    }
  }
}
</script>