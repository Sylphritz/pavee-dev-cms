<template>
  <div v-if="$auth.currentUser">
    Logged in as
    <span class="font-bold">{{ $auth.currentUser.displayName }}</span> |
  </div>
</template>

<script lang="ts" setup>
const { $auth } = useNuxtApp()
</script>
