<template>
  <form @submit="submit">
    <Modal width="600px">
      <template #header>
        <div class="flex flex-row justify-between items-center">
          <h4 class="m-0">New Category</h4>
          <button
            class="uppercase underline underline-offset-4 text-purple-500 hover:text-purple-600"
            @click="closeAndReset"
          >
            close
          </button>
        </div>
      </template>

      <FormInputGroup name="name" label="Name" @change="generateSlug" />
      <FormInputGroup name="slug" label="Slug" />
      <FormInputGroup name="description" label="Description" />
      <FormInputGroup name="sortOrder" label="Sort order" type="number" />

      <template #footer>
        <div class="flex flex-row justify-between">
          <button
            class="py-2 px-4 rounded-sm font-medium bg-gray-300 hover:bg-gray-400 active:bg-gray-300"
            @click.prevent="closeAndReset"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="py-2 px-4 rounded-sm font-medium bg-purple-500 hover:bg-purple-600 active:bg-purple-500 text-white"
            @click="submit"
          >
            Confirm
          </button>
        </div>
      </template>
    </Modal>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import slugify from 'slugify'

const props = defineProps({
  data: {
    type: Object,
  },
})
const emits = defineEmits(['close', 'category-added'])

const { $auth } = useNuxtApp()

const { handleSubmit, isSubmitting, resetForm, setFieldValue, setValues } =
  useForm({
    validationSchema: {
      name: 'required|max:48',
      slug: 'required|max:48',
      description: 'max:255',
      sortOrder: 'integer',
    },
  })

watchEffect(() => {
  if (props.data) {
    setValues(props.data)
  }
})

const generateSlug = (value: string) => {
  setFieldValue(
    'slug',
    slugify(value, {
      lower: true,
      strict: true,
      locale: 'en',
    })
  )
}

const closeAndReset = () => {
  resetForm()
  emits('close')
}

const submit = handleSubmit(async (values) => {
  try {
    await $fetch(
      props.data ? `/api/v1/categories/${props.data.id}` : '/api/v1/categories',
      {
        method: props.data ? 'PUT' : 'POST',
        body: {
          userId: $auth.currentUser!.uid,
          ...values,
        },
      }
    )

    resetForm()
    emits('category-added')
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      alert('Something went wrong.')
    }
  }
})
</script>

<style></style>
