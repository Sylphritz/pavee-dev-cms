<template>
  <div
    class="flex flex-col min-h-screen overflow-auto bg-gradient-to-b from-purple-100 to-gray-100"
  >
    <LayoutStaticHeader />
    <div class="flex-grow">
      <slot />
    </div>
    <LayoutStaticFooter />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

useHead({
  title: route.meta.title,
  meta: [{ name: 'robots', content: 'noindex,follow' }],
})
</script>

<style></style>
