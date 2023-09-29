<template>
  <div class="flex flex-row justify-between items-end mb-6">
    <h2 class="flex-grow m-0">Categories</h2>
    <div class="flex-none">
      <button
        class="py-2 px-4 font-medium rounded-sm bg-purple-500 text-white"
        @click="formOpen = true"
      >
        New Category
      </button>
    </div>
  </div>
  <div>
    <Table>
      <template #header>
        <th>ID</th>
        <th>Order</th>
        <th>Name</th>
        <th>Slug</th>
        <th>Description</th>
        <th>Posts</th>
        <th>Created At</th>
      </template>
      <tr
        v-for="{
          id,
          name,
          slug,
          description,
          sortOrder,
          createdAt,
          postCount,
        } in data"
        :key="id"
      >
        <td>{{ id }}</td>
        <td>{{ sortOrder }}</td>
        <td>{{ name }}</td>
        <td>{{ slug }}</td>
        <td>{{ description }}</td>
        <td>{{ postCount }}</td>
        <td>{{ createdAt }}</td>
      </tr>
    </Table>
  </div>
  <CategoryForm
    v-if="formOpen"
    @close="formOpen = false"
    @category-added="reloadTable"
  />
</template>

<script lang="ts" setup>
const { $auth } = useNuxtApp()

const formOpen = ref(false)
const pagination = reactive({
  page: 1,
  perPage: 10,
})

// TODO: Functions for editing and deleting

const { data, pending, error, refresh } = await useFetch('/api/v1/categories', {
  query: { userId: $auth.currentUser!.uid, ...pagination },
})

const reloadTable = () => {
  refresh()
  formOpen.value = false
}
</script>
