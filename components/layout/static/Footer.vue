<template>
  <div class="p-6 text-center">
    Designed and Developed by
    <NuxtLink to="https://pavee.dev" target="_blank" external
      >Pavee Udomkarnpaisarn</NuxtLink
    >
    | Copyright © {{ currentYear }}. All rights reserved.
  </div>
</template>

<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<style></style>
