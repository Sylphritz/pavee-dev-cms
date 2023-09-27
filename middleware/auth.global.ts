export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return

  const { $auth, $firebaseInitialized, $checkAuthState } = useNuxtApp()

  // Check the initial auth state on application load
  if (!$firebaseInitialized.value) {
    await $checkAuthState()
  }

  if (to.meta.protected && !$auth.currentUser) {
    return navigateTo('/login')
  }
})
