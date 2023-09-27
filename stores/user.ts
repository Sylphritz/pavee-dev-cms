import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

export default defineStore('user', () => {
  const { $auth } = useNuxtApp()

  async function register(values: Record<string, any>) {
    const userCredentials = await createUserWithEmailAndPassword(
      $auth,
      values.email,
      values.password
    )

    await updateProfile(userCredentials.user, {
      displayName: values.name,
    })
  }

  async function login(values: Record<string, any>) {
    await signInWithEmailAndPassword($auth, values.email, values.password)
    useRouter().push('/')
  }

  async function logout() {
    await signOut($auth)
    useRouter().push('/login')
  }

  return {
    register,
    login,
    logout,
  }
})
