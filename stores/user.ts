import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

export default defineStore('user', () => {
  const { $auth } = useNuxtApp()
  const isLoggedIn = ref(!!$auth.currentUser)

  async function register(values: Record<string, any>) {
    const userCredentials = await createUserWithEmailAndPassword(
      $auth,
      values.email,
      values.password
    )

    await updateProfile(userCredentials.user, {
      displayName: values.name,
    })

    isLoggedIn.value = true
  }

  async function login(values: Record<string, any>) {
    await signInWithEmailAndPassword($auth, values.email, values.password)
    isLoggedIn.value = true
    useRouter().push('/')
  }

  async function logout() {
    await signOut($auth)
    isLoggedIn.value = false
    useRouter().push('/login')
  }

  return {
    isLoggedIn,
    register,
    login,
    logout,
  }
})
