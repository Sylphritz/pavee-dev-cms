// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useRuntimeConfig().app

  const firebaseConfig = {
    apiKey: appConfig.firebaseApiKey,
    authDomain: appConfig.firebaseAuthDomain,
    projectId: appConfig.firebaseProjectId,
    appId: appConfig.firebaseAppId,
    measurementId: appConfig.firebaseMeasurementId,
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const initialized = ref(false)

  async function checkAuthState() {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
