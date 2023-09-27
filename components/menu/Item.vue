<template>
  <li class="list-none first:mt-3">
    <NuxtLink
      :to="to"
      class="block text-lg py-3 px-6 font-normal text-gray-100 hover:bg-slate-900 hover:text-gray-200"
      active-class="text-gray-100 !font-semibold bg-slate-900"
    >
      <slot />
    </NuxtLink>
  </li>
</template>

<script lang="ts" setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
})
</script>

<style></style>
