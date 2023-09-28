<template>
  <input
    :id="name"
    :name="name"
    :type="type"
    v-model="value"
    class="block w-full p-3 bg-gray-100 border-2 rounded-md border-purple-200 focus:outline-none focus:border-purple-300 disabled:bg-gray-200"
    :class="{ 'border-red-400': errorMessage }"
    @blur="() => validate()"
    @change="$emit('change', value)"
  />
  <div class="py-1 text-red-400">{{ errorMessage }}</div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  rules: {
    type: String,
  },
})

defineEmits(['change'])

const { value, errorMessage, validate } = useField(
  () => props.name,
  props.rules,
  {
    validateOnValueUpdate: false,
  }
)
</script>

<style scoped></style>
