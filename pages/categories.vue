<template>
  <div class="flex flex-row justify-between items-end mb-6">
    <h2 class="flex-grow m-0">Categories</h2>
    <div class="flex-none">
      <button
        class="py-2 px-4 font-medium rounded-sm bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white hover:text-white"
        @click="openForm()"
      >
        New Category
      </button>
    </div>
  </div>
  <div class="flex flex-col gap-2">
    <Table>
      <template #header>
        <th>ID</th>
        <th>Order</th>
        <th>Name</th>
        <th>Slug</th>
        <th>Description</th>
        <th>Posts</th>
        <th>Created At (UTC)</th>
        <th>Actions</th>
      </template>
      <tr
        v-if="data"
        v-for="{
          id,
          name,
          slug,
          description,
          sortOrder,
          createdAt,
          postCount,
        } in data.data"
        :key="id"
      >
        <td>{{ id }}</td>
        <td>{{ sortOrder }}</td>
        <td>{{ name }}</td>
        <td>{{ slug }}</td>
        <td>{{ description }}</td>
        <td>{{ postCount }}</td>
        <td>{{ createdAt }}</td>
        <td>
          <div class="flex flex-row gap-2">
            <button
              class="p-2 rounded-sm bg-green-600 hover:bg-green-700 active:bg-green-800 text-white"
              @click="openForm({ id, name, slug, description, sortOrder })"
            >
              <IconEdit />
            </button>
            <button
              class="p-2 rounded-sm bg-red-500 hover:bg-red-600 active:bg-red-700 text-white"
              @click="deleteCategory(id, name)"
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
  <CategoryForm
    v-if="formOpen"
    @close="formOpen = false"
    @category-added="reloadTable"
    :data="formData"
  />
</template>

<script lang="ts" setup>
definePageMeta({
  protected: true,
  title: 'Categories',
})

const { $auth } = useNuxtApp()

const formOpen = ref(false)
const formData = ref<object | undefined>({})

const page = ref(1)
const perPage = 10
const totalItems = ref(0)

const totalPages = computed(() => Math.ceil(totalItems.value / perPage) || 1)

const { data, pending, error, refresh, execute } = await useFetch(
  '/api/v1/categories',
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

const reloadTable = async () => {
  await refresh()
  formOpen.value = false
}

const openForm = (newData?: object) => {
  formData.value = newData
  formOpen.value = true
}

const deleteCategory = async (categoryId: number, name: string) => {
  if (confirm(`Are you sure you want to delete ${name}?`)) {
    await $fetch(`/api/v1/categories/${categoryId}`, {
      method: 'DELETE',
    })

    reloadTable()
  }
}
</script>
