<template>
  <div class="p-3">
    <div class="w-5/12 mx-auto my-3 h-12">
      <Transition>
        <AlertBox
          v-if="alertMessage"
          :message="alertMessage"
          :type="alertType"
        />
      </Transition>
    </div>
    <div
      class="w-5/12 mx-auto p-6 border rounded-md border-purple-200 shadow bg-gray-100"
    >
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
  </div>
</template>

<script lang="ts" setup>
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useForm } from 'vee-validate'

definePageMeta({
  layout: 'static',
})

const alertMessage = ref('')
const alertType = ref('success')

const { $auth } = useNuxtApp()

const validationSchema = {
  name: 'required|min:4',
  email: 'required|min:4|email',
  password: 'required|min:4|max:48',
  passwordConfirm: 'confirmed:@password',
}

const { handleSubmit, isSubmitting } = useForm({ validationSchema })

const submit = handleSubmit(async (values) => {
  try {
    const result = await createUserWithEmailAndPassword(
      $auth,
      values.email,
      values.password
    )
    console.log(result)
  } catch (error) {
    if (error instanceof Error) {
      alertMessage.value = error.message
      alertType.value = 'danger'
    }
  }
})
</script>
