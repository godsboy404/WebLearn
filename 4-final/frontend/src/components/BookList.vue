<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <book-card 
      v-for="book in books" 
      :key="book.id" 
      :book="book" 
      @edit="$emit('edit', book)" 
      @delete="$emit('delete', book.id)"
      @view="$emit('view', book)"
    ></book-card>
  </div>
  
  <div v-if="books.length === 0" class="text-center py-12 bg-white rounded-lg shadow">
    <p class="text-gray-500 text-lg">暂无图书，点击上方按钮添加第一本书吧！</p>
  </div>
</template>

<script>
import BookCard from './BookCard.vue'

export default {
  name: 'BookList',
  components: {
    BookCard
  },
  props: {
    books: {
      type: Array,
      default: () => []
    }
  },
  emits: ['edit', 'delete', 'view']
}
</script>