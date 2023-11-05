// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: appConfig.public.firebaseApiKey,
    authDomain: appConfig.public.firebaseAuthDomain,
    projectId: appConfig.public.firebaseProjectId,
    appId: appConfig.public.firebaseAppId,
    measurementId: appConfig.public.firebaseMeasurementId,
  }

  // console.log(firebaseConfig)

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const initialized = ref(false)

  async function checkAuthState() {
    return new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        initialized.value = true
        unsubscribe()
        resolve()
      })
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
