<template>
  <div class="flex flex-row justify-between items-end mb-6">
    <h2 class="flex-grow m-0">Posts</h2>
    <div class="flex-none">
      <button class="py-2 px-4 font-medium rounded-sm bg-purple-500 text-white">
        New Post
      </button>
    </div>
  </div>
  <div class="flex flex-col gap-2">
    <Table>
      <template #header>
        <th>ID</th>
        <th>Title (Slug)</th>
        <th>Category</th>
        <th>Created At (UTC)</th>
        <th>Updated At (UTC)</th>
        <th>Actions</th>
      </template>
      <tr
        v-if="data"
        v-for="{ id, title, slug, category, createdAt, updatedAt } in data.data"
        :key="id"
      >
        <td>{{ id }}</td>
        <td>
          {{ title }}<br />
          ({{ slug }})
        </td>
        <td>{{ category?.name }}</td>
        <td>{{ createdAt }}</td>
        <td>{{ updatedAt }}</td>
        <td>
          <div class="flex flex-row gap-2">
            <button
              class="p-2 rounded-sm bg-green-600 hover:bg-green-700 active:bg-green-800 text-white"
            >
              <IconEdit />
            </button>
            <button
              class="p-2 rounded-sm bg-red-500 hover:bg-red-600 active:bg-red-700 text-white"
              @click="deletePost(id, title)"
            >
              <IconDelete />
            </button>
          </div>
        </td>
      </tr>
    </Table>
    <TablePagination
      :page="page"
      :total-pages="totalPages"
      @previous-page="page -= 1"
      @next-page="page += 1"
    />
  </div>
</template>

<script lang="ts" setup>
const { $auth } = useNuxtApp()

const page = ref(1)
const perPage = 10
const totalItems = ref(0)

const totalPages = computed(() => Math.ceil(totalItems.value / perPage) || 1)

const { data, pending, error, refresh, execute } = await useFetch(
  '/api/v1/posts',
  {
    query: {
      userId: $auth.currentUser!.uid,
      page,
      perPage,
    },
    onResponse: ({ response }) => {
      if (response._data) {
        totalItems.value = response._data.pagination.total
      }
    },
  }
)

const deletePost = async (postId: number, name: string) => {
  if (confirm(`Are you sure you want to delete ${name}?`)) {
    await $fetch(`/api/v1/posts/${postId}`, {
      method: 'DELETE',
    })

    await refresh()
  }
}
</script>
