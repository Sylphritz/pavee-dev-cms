<template>
  <div class="py-3 px-6 flex flex-row justify-end gap-3">
    <a href="#" @click.prevent="logout">Logout</a>
  </div>
</template>

<script lang="ts" setup>
import useUserStore from '@/stores/user'

const { logout } = useUserStore()
</script>

<style></style>
