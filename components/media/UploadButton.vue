<template>
  <button
    class="px-4 py-2 rounded-sm bg-purple-500 text-white"
    @click.prevent="openFileDialog"
  >
    Upload
  </button>
  <input type="file" class="hidden" ref="fileInput" @change="processFile" />
</template>

<script lang="ts" setup>
const { $auth } = useNuxtApp()

const fileInput = ref<HTMLInputElement>()

const openFileDialog = () => {
  if (fileInput.value) fileInput.value.click()
}

const processFile = async (event: Event) => {
  if (!event.target) return

  const target = event.target as HTMLInputElement

  if (!target.files?.length) return

  const formData = new FormData()
  formData.append('file', target.files[0])

  await useFetch(`/api/v1/internal/media/upload/${$auth.currentUser!.uid}`, {
    method: 'POST',
    body: formData,
  })

  location.reload()
}
</script>

<style></style>
