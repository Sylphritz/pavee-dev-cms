<template>
  <div class="flex flex-row gap-3">
    <form class="flex-auto" @submit="submit">
      <fieldset :disabled="isSubmitting">
        <FormInputGroup name="title" label="Title" @change="generateSlug" />
        <div class="flex flex-row gap-3">
          <FormInputGroup class="flex-auto" name="slug" label="Slug" />
          <FormInputGroup
            class="flex-auto"
            type="select"
            name="categoryId"
            label="Category"
          >
            <option value="" disabled>Pick a category</option>
            <option
              v-for="{ label, value } in categories"
              :key="value"
              :value="value"
            >
              {{ label }}
            </option>
          </FormInputGroup>
        </div>
        <FormInputGroup
          type="textarea"
          name="metaDescription"
          label="Meta Description"
          :rows="2"
        />
        <div class="relative">
          <FormInputGroup
            v-show="!isPreviewing"
            type="textarea"
            name="body"
            label="Body"
            :rows="20"
          />
          <div v-show="isPreviewing" class="preview-container">
            <label class="block mb-1 pb-1 tracking-widest uppercase"
              >Body</label
            >
            <div v-html="parsedBody"></div>
          </div>
          <div class="absolute top-0 right-0 flex flex-row gap-2">
            <button
              class="font-medium"
              :class="[isPreviewing ? 'text-gray-500/50' : 'text-purple-500']"
              @click.prevent="isPreviewing = false"
            >
              Raw Text
            </button>
            |
            <button
              class="font-medium"
              :class="[!isPreviewing ? 'text-gray-500/50' : 'text-purple-500']"
              @click.prevent="isPreviewing = true"
            >
              Preview
            </button>
          </div>
        </div>
      </fieldset>
    </form>
    <div class="flex-none w-1/4 p-3 relative">
      <div class="sticky top-0 bg-purple-200 p-3 rounded-sm">
        <div class="text-sm">Word count (not accurate)</div>
        <div class="text-2xl font-bold mb-3">{{ wordCount }}</div>
        <a
          href="https://imgcdn.dev/"
          target="_blank"
          class="block p-3 w-full rounded-sm bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white hover:text-white font-bold tracking-wider uppercase text-center"
        >
          Upload Image
        </a>
        <hr class="my-3 border-purple-500/50" />
        <button
          class="p-3 w-full rounded-sm bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold tracking-wider uppercase text-center"
          @click.prevent="submit"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import slugify from 'slugify'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

interface CategorySelectOptions {
  label: string
  value: number
}

const categories = ref<CategorySelectOptions[]>([])

const { $auth } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const postId = route.params.id

const { data: categoryData } = await $fetch('/api/v1/categories', {
  method: 'GET',
  query: {
    userId: $auth.currentUser!.uid,
    page: 1,
    perPage: -1,
  },
})

categories.value = categoryData.map((cat) => ({
  label: cat.name,
  value: cat.id,
}))

const {
  values,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  setValues,
  validate,
} = useForm({
  validationSchema: {
    title: 'required|max:255',
    slug: 'required|max:255',
    categoryId: 'required|integer',
    metaDescription: 'required|max:300',
    body: 'required',
  },
})

setFieldValue('categoryId', '')

if (postId) {
  const postData = await $fetch(`/api/v1/posts/${postId}`, {
    method: 'GET',
  })

  setValues(postData)
  await validate()
}

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

const submit = handleSubmit(async (values) => {
  try {
    await $fetch(postId ? `/api/v1/posts/${postId}` : '/api/v1/posts', {
      method: postId ? 'PUT' : 'POST',
      body: {
        userId: $auth.currentUser!.uid,
        ...values,
      },
    })

    router.push('/posts')
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      alert('Something went wrong.')
    }
  }
})

const parsedBody = computed(() =>
  values.body ? DOMPurify.sanitize(marked.parse(values.body)) : ''
)
const isPreviewing = ref(false)
const wordCount = computed(() =>
  values.body ? values.body.trim().split(/\s+/).length : 0
)
</script>

<style lang="scss" scoped>
.preview-container {
  min-height: 500px;
}
</style>
