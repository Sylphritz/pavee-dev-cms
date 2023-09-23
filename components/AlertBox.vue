<template>
  <div
    class="py-3 px-6 border rounded-md shadow-sm"
    :class="alertClasses[type]"
  >
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info',
    validator(value: string) {
      return ['info', 'success', 'warning', 'danger'].includes(value)
    },
  },
})

const alertClasses: Record<string, string> = {
  info: 'bg-purple-400/50 border-purple-500 text-purple-700',
  success: 'bg-green-400/50 border-green-500 text-green-700',
  warning: 'bg-yellow-400/50 border-yellow-500 text-yellow-700',
  danger: 'bg-red-400/50 border-red-500 text-red-700',
}
</script>
