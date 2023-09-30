<template>
  <div class="p-2 flex flex-row justify-center items-center gap-4">
    <button
      class="py-2 px-4 bg-purple-500 text-white rounded-sm hover:bg-purple-600 active:bg-purple-700 disabled:bg-gray-400"
      :disabled="page === 1"
      @click="$emit('previous-page')"
    >
      &lt; Previous page
    </button>
    <div>page {{ page }} of {{ totalPages }}</div>
    <button
      class="py-2 px-4 bg-purple-500 text-white rounded-sm hover:bg-purple-600 active:bg-purple-700 disabled:bg-gray-400"
      :disabled="page === totalPages"
      @click="$emit('next-page')"
    >
      Next page &gt;
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  page: Number,
  totalPages: Number,
})

defineEmits(['previous-page', 'next-page'])
</script>
