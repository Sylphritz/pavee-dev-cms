<template>
  <ClientOnly>
    <div
      v-if="!!$auth.currentUser"
      class="flex flex-col min-h-screen overflow-auto bg-gradient-to-b from-purple-100 to-gray-100"
    >
      <LayoutDefaultHeader />
      <div class="flex-grow">
        <slot />
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
// Supports weights 100-900
import '@fontsource-variable/inter'

const { $auth } = useNuxtApp()
</script>

<style></style>
