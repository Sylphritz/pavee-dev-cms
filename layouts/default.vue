<template>
  <ClientOnly>
    <div
      v-if="!!$auth.currentUser"
      class="flex flex-col h-screen overflow-hidden"
    >
      <LayoutDefaultHeader />
      <div class="flex-grow flex flex-row overflow-hidden">
        <LayoutDefaultSidebar />
        <div class="flex-grow h-full overflow-auto">
          <slot />
        </div>
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
