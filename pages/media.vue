<template>
  <div class="flex flex-col min-h-full">
    <div class="flex-none flex flex-row justify-between items-end mb-6">
      <h2 class="m-0">Media</h2>
      <div>
        <MediaUploadButton />
      </div>
    </div>
    <div class="flex-grow border-2 border-gray-300 rounded-sm p-3 bg-gray-200">
      <div class="flex flex-row flex-wrap gap-3">
        <div
          class="thumbnail flex-grow-0 border-2 rounded-sm border-gray-600 bg-gray-400 flex items-center overflow-hidden"
          v-for="file in files"
        >
          <img
            :src="`https://box.pavee.dev/${file.Key}`"
            class="object-contain aspect-auto"
          />
        </div>
      </div>
      <div class="py-3 text-center">
        <button
          class="px-4 py-2 rounded-sm bg-purple-500 text-white"
          @click.prevent="loadFiles"
          v-if="!noMoreFiles"
        >
          Load more
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { _Object } from '@aws-sdk/client-s3'

const { $auth } = useNuxtApp()

const perPage = 100
const files = ref<_Object[]>([])
const continuationToken = ref<string | undefined>(undefined)
const noMoreFiles = ref(false)

const loadFiles = async () => {
  if (noMoreFiles.value) return

  const { data, pending } = await useFetch(
    `/api/v1/internal/media/list/${$auth.currentUser!.uid}`,
    {
      query: {
        limit: perPage,
        token: continuationToken.value,
      },
    }
  )

  if (pending.value) {
    loadFiles()
    return
  }

  noMoreFiles.value = !data.value?.IsTruncated

  if (data.value?.IsTruncated) {
    continuationToken.value = data.value.NextContinuationToken
  }

  if (data.value?.Contents) {
    files.value = [...files.value, ...(data.value.Contents as _Object[])]
  }
}

onMounted(loadFiles)
</script>

<style lang="scss">
.thumbnail {
  height: 200px;
  width: 200px;
}
</style>
