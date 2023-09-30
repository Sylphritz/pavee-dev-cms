<template>
  <Teleport to="body">
    <div
      class="fixed top-0 left-0 z-10 w-full h-full bg-gray-800/50 overflow-auto p-6"
    >
      <div
        class="mt-10 w-fit mx-auto bg-gray-100 flex flex-col rounded-sm shadow-lg"
        :style="{ width }"
      >
        <div v-if="$slots.header" class="relative p-3 border-b-2">
          <slot name="header" />
        </div>
        <div class="relative p-3">
          <slot />
        </div>
        <div v-if="$slots.footer" class="relative p-3 border-t-2">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
defineProps({
  width: {
    type: String,
  },
})
</script>
