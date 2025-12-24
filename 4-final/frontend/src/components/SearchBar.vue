<template>
  <div class="bg-white p-4 rounded-lg shadow mb-6">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <input 
          v-model="searchQuery" 
          @input="$emit('search', searchQuery)"
          type="text" 
          placeholder="搜索书名或作者..." 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
      <button 
        @click="$emit('search', searchQuery)"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
      >
        搜索
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SearchBar',
  emits: ['search'],
  setup(props, { emit }) {
    const searchQuery = ref('')
    
    return {
      searchQuery
    }
  }
}
</script>