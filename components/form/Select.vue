<template>
  <div class="relative">
    <select
      :id="name"
      :name="name"
      v-model="value"
      class="block w-full p-3 bg-gray-100 border-2 rounded-md border-purple-200 focus:outline-none hover:border-purple-300 disabled:bg-gray-200 appearance-none cursor-pointer"
      @change="onChange"
    >
      <slot />
    </select>
    <div
      class="absolute block right-0 top-1/2 -translate-y-1/2 pr-4 text-purple-500/50"
    >
      <IconCaretDown class="h-5" />
    </div>
  </div>
  <div class="py-1 text-red-400">{{ errorMessage }}</div>
</template>

<script lang="ts" setup>
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

const emit = defineEmits(['change'])

const { value, errorMessage, validate } = useField<string | number>(
  () => props.name,
  props.rules,
  {
    validateOnValueUpdate: false,
  }
)

const onChange = () => {
  validate()
  emit('change', value)
}
</script>
