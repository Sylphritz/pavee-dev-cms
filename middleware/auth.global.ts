import useUserStore from '@/stores/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return

  // const userStore = useUserStore()
  const { $auth, $firebaseInitialized, $checkAuthState } = useNuxtApp()

  // Check the initial auth state on application load
  if (!$firebaseInitialized.value) {
    console.log('Checking auth state')
    await $checkAuthState()
  }

  if (to.meta.protected && !$auth.currentUser) {
    return navigateTo('/login')
  }
})
