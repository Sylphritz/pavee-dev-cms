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

// export default defineStore({
//   id: 'user',
//   state: () => ({
//     isLoggedIn: false,
//   }),
//   actions: {
//     async register(values: Record<string, any>) {
//       const { $auth } = useNuxtApp()
//       const userCredentials = await createUserWithEmailAndPassword(
//         $auth,
//         values.email,
//         values.password
//       )

//       await updateProfile(userCredentials.user, {
//         displayName: values.name,
//       })

//       this.isLoggedIn = true
//     },
//   },
// })

// import { auth, usersCollection } from '@/includes/firebase'

// export default defineStore('user', {
//   state: () => ({
//     userLoggedIn: false,
//   }),
//   actions: {
//     async register(values) {
//       const userCredentials = await auth.createUserWithEmailAndPassword(
//         values.email,
//         values.password
//       )

//       await usersCollection.doc(userCredentials.user.uid).set({
//         name: values.name,
//         email: values.email,
//         age: values.age,
//         country: values.country,
//       })

//       await userCredentials.user.updateProfile({
//         displayName: values.name,
//       })

//       this.userLoggedIn = true
//     },
//     async authenticate(values) {
//       await auth.signInWithEmailAndPassword(values.email, values.password)
//       this.userLoggedIn = true
//     },
//     async signOut() {
//       await auth.signOut()
//       this.userLoggedIn = false
//     },
//   },
// })
