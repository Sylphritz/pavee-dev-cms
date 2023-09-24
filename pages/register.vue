<template>
  <div class="p-3">
    <div class="w-5/12 mx-auto">
      <div class="my-3 h-12">
        <AlertBox
          v-if="alertMessage"
          :message="alertMessage"
          :type="alertType"
        />
      </div>
      <div class="p-6 border rounded-md border-purple-200 shadow bg-gray-100">
        <h4 class="uppercase tracking-wide">Register</h4>
        <form @submit="submit">
          <fieldset :disabled="isSubmitting">
            <FormInputGroup label="Name" name="name" />
            <FormInputGroup label="Email" name="email" />
            <FormInputGroup label="Password" name="password" type="password" />
            <FormInputGroup
              label="Confirm Password"
              name="passwordConfirm"
              type="password"
            />
            <button
              type="submit"
              class="block bg-purple-500 hover:bg-purple-600 active:bg-purple-500 w-full p-3 rounded-md text-gray-100 disabled:bg-purple-400"
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
      <div class="text-center py-3">
        Already have an account? <NuxtLink to="/login">Login</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FirebaseError } from 'firebase/app'
import { getErrorMessage } from '@/utils/firebase/getErrorMessage'
import { useForm } from 'vee-validate'
import useUserStore from '@/stores/user'

definePageMeta({
  layout: 'static',
  title: 'Register',
})

const alertMessage = ref('')
const alertType = ref('success')

const userStore = useUserStore()

const validationSchema = {
  name: 'required|min:4',
  email: 'required|min:4|email',
  password: 'required|min:6|max:48',
  passwordConfirm: 'confirmed:@password',
}

const { handleSubmit, isSubmitting, resetForm } = useForm({ validationSchema })

const submit = handleSubmit(async (values) => {
  try {
    await userStore.register(values)
    alertMessage.value = 'Account successfully created. Redirecting...'
    alertType.value = 'success'
    resetForm()
    useRouter().push('/')
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.code)
      alertMessage.value = getErrorMessage(error.code)
      alertType.value = 'danger'
    }
  }
})
</script>
