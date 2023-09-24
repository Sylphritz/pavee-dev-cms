// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// TODO: Move the sensitive data to .env
const firebaseConfig = {
  apiKey: 'AIzaSyBO3w6Lk09WqknFgYBgKKfmQOuIU3jb0s8',
  authDomain: 'paveedev.firebaseapp.com',
  projectId: 'paveedev',
  storageBucket: 'paveedev.appspot.com',
  messagingSenderId: '78781065964',
  appId: '1:78781065964:web:3fc1f2b8a88ebab1d253c9',
  measurementId: 'G-0FZLG12SQH',
}

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const initialized = ref(false)

  async function checkAuthState() {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('asdjnask')
      // isLoggedIn.value = !!user

      if (user) {
        console.log('Logged in')
      } else {
        console.log('Not logged in')
      }

      initialized.value = true
    })

    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (initialized.value) {
          clearInterval(interval)
          unsubscribe()
          resolve()
        }
      }, 50)
    })
  }

  return {
    provide: {
      auth,
      firebaseInitialized: initialized,
      checkAuthState,
    },
  }
})
