<template>
  <textarea
    :id="name"
    :name="name"
    v-model="value"
    class="block w-full p-3 bg-gray-100 border-2 rounded-md border-purple-200 focus:outline-none focus:border-purple-300 disabled:bg-gray-200"
    :class="{ 'border-red-400': errorMessage }"
    @blur="() => validate()"
    @change="$emit('change', value)"
    :rows="rows"
  ></textarea>
  <div class="py-1 flex flex-row">
    <div class="flex-auto text-red-400">{{ errorMessage }}</div>
    <div class="flex-none pr-1">{{ value?.toString().length || 0 }}</div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
  },
  rows: {
    type: Number,
    default: 5,
  },
})

defineEmits(['change'])

const { value, errorMessage, validate } = useField<string>(
  () => props.name,
  props.rules,
  {
    validateOnValueUpdate: false,
  }
)
</script>
