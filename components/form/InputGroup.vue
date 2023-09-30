<template>
  <div class="mb-3">
    <label
      v-if="label"
      :for="name"
      class="block mb-1 pb-1 tracking-widest uppercase"
      >{{ label }}</label
    >
    <FormInput
      :name="name"
      :type="type"
      :rules="rules"
      @change="(value) => $emit('change', value)"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
  },
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
</script>
