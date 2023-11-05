<template>
  <ClientOnly>
    <div
      v-if="!!$auth.currentUser"
      class="flex flex-col h-screen overflow-hidden"
    >
      <LayoutDefaultHeader />
      <div class="flex-grow flex flex-row overflow-hidden">
        <LayoutDefaultSidebar />
        <div class="flex-grow h-full overflow-auto p-6">
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

const route = useRoute()

watchEffect(() => {
  useHead({
    title: route.meta?.title || 'Dashboard',
    meta: [{ name: 'robots', content: 'noindex,follow' }],
  })
})
</script>

<style></style>
