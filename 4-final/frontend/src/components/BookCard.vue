<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
    <div class="h-48 bg-gray-200 relative">
      <img 
        :src="book.coverImage || 'https://picsum.photos/seed/default-book/200/300.jpg'" 
        :alt="book.title" 
        class="w-full h-full object-cover"
      >
      <div class="absolute top-2 right-2">
        <span 
          :class="statusClass" 
          class="px-2 py-1 text-xs rounded-full text-white"
        >
          {{ statusText }}
        </span>
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="font-bold text-lg mb-1 text-gray-800 truncate">{{ book.title }}</h3>
      <p class="text-gray-600 text-sm mb-2">{{ book.author }}</p>
      
      <div class="flex items-center mb-3">
        <div class="flex text-yellow-400">
          <span v-for="i in 5" :key="i" class="text-sm">
            {{ i <= (book.rating || 0) ? '★' : '☆' }}
          </span>
        </div>
        <span v-if="book.rating && book.rating > 0" class="text-xs text-gray-500 ml-1">({{ book.rating }})</span>
      </div>
      
      <div class="flex flex-wrap gap-1 mb-3">
        <span
          v-for="tag in (book.tags || []).slice(0, 2)"
          :key="tag"
          class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
        >
          {{ tag }}
        </span>
        <span v-if="book.tags && book.tags.length > 2" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
          +{{ book.tags.length - 2 }}
        </span>
      </div>
      
      <div class="flex justify-between">
        <button 
          @click="$emit('view', book)" 
          class="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          查看详情
        </button>
        <div class="flex gap-2">
          <button 
            @click="$emit('edit', book)" 
            class="text-green-600 hover:text-green-800 text-sm font-medium transition-colors"
          >
            编辑
          </button>
          <button 
            @click="$emit('delete', book.id)" 
            class="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  emits: ['view', 'edit', 'delete'],
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
  }
}
</script>